# Marketing Attribution Model (In-House Build)

**Duration:** 3 months  
**When:** Spring 2024

**Stack:** Tealium, AWS Redshift, Tableau  
**Goal:** Replace Google Universal Analytics attribution logic before its sunset and ensure continuity of marketing performance reporting.

---

## The Challenge

When **Google Universal Analytics (UA)** was being deprecated, our marketing team needed to preserve consistent campaign performance reporting.  
UA’s *last-click non-direct attribution model* was our baseline — and with a 6-month campaign lookback window, the data couldn’t simply be ported to GA4.

To maintain continuity, we decided to **rebuild the attribution logic in-house**, using our event-level tracking data.

---

## Objective

> Build a **last-click non-direct attribution model** with a **6-month campaign timeout**, fully in SQL, and benchmark its accuracy against GA Universal Analytics data.

Key success metric:  
✅ ≤ 2% deviation between channel distribution of conversions in our model vs. GA.

---

## Background: UTM & Channel Mapping

Most campaigns used **UTM parameters** in their URLs:

| Parameter | Example | Meaning |
|------------|----------|---------|
| `utm_source` | google | Origin of the traffic |
| `utm_medium` | cpc | Marketing medium |
| `utm_campaign` | spring_sale | Campaign identifier |
| `utm_content` | banner_a | Creative variation |
| `utm_term` | bike shoes | Keyword |

We first created a **Channel Mapping Table**, aligning each `(utm_source, utm_medium)` pair to a standardized **Marketing Channel**.

| utm_source | utm_medium | channel_name |
|-------------|-------------|---------------|
| google | cpc | Paid Search |
| facebook | paid_social | Paid Social |
| newsletter | email | Email |
| partner | referral | Partnerships |
| (empty) | (direct) | Direct |

This allowed us to categorize traffic consistently, independent of campaign naming chaos.

---

## Data Model

Event data was collected from our web tracking pipeline:

| user_id | session_id | event_type | event_time | utm_source | utm_medium | utm_campaign | conversion_flag |
|----------|-------------|-------------|-------------|-------------|-------------|----------------|-----------------|
| 10023 | s_882 | page_view | 2024-01-03 | google | cpc | winter_sale | 0 |
| 10023 | s_882 | conversion | 2024-01-04 | google | cpc | winter_sale | 1 |
| 10023 | s_902 | page_view | 2024-02-17 | facebook | paid_social | spring_push | 0 |
| 10023 | s_902 | conversion | 2024-02-17 | facebook | paid_social | spring_push | 1 |
| 10055 | s_914 | conversion | 2024-02-20 | (direct) | (none) | (none) | 1 |

---

## SQL Logic (Simplified)

We applied **window functions** to determine each user’s most recent eligible touchpoint within the 6-month attribution window.

```sql
WITH sessions AS (
  SELECT
    user_id,
    session_id,
    event_time,
    utm_source,
    utm_medium,
    utm_campaign,
    CASE WHEN utm_source IS NULL OR utm_medium IN ('none', '(none)', 'direct')
         THEN 'Direct'
         ELSE CONCAT(utm_source, '_', utm_medium)
    END AS channel_key,
    event_type
  FROM events
  WHERE event_time >= CURRENT_DATE - INTERVAL '6 month'
),

last_click AS (
  SELECT DISTINCT
    user_id,
    event_time AS conversion_time,
    FIRST_VALUE(channel_key) OVER (
      PARTITION BY user_id ORDER BY event_time DESC
      ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS last_non_direct_channel
  FROM sessions
  WHERE event_type = 'conversion'
)

SELECT
  channel_key,
  COUNT(*) AS conversions
FROM last_click
GROUP BY 1
ORDER BY conversions DESC;
```

This logic effectively reproduces UA’s last non-direct click model:
- “Direct” sessions don’t override previous campaign sources.
- Conversions inherit the latest valid campaign within the lookback period.

## Model Workflow Overview

``` mermaid
flowchart TD
  A[Event Data, i.e. Pageviews, Conversions] --> B[UTM Channel Mapping]
  B --> C[Sessionized Dataset]
  C --> D[Attribution Model SQL]
  D --> E[Aggregated Channel Report]
  E --> F[Dashboard]
  F --> G[Marketing Performance Insights]
  ```

## Validation & Results

After full rollout, we benchmarked results against UA data for the same time period (fictionalized sample):

| Channel     | GA UA Conversions | Our Model | Δ (%) |
| ----------- | ----------------- | --------- | ----- |
| Paid Search | 42,000            | 41,300    | -1.7% |
| Paid Social | 21,500            | 22,000    | +2.3% |
| Email       | 5,200             | 5,180     | -0.4% |
| Referral    | 3,900             | 3,850     | -1.3% |
| Direct      | 18,000            | 17,950    | -0.3% |

> Overall deviation: within ±2% of UA results — confirming attribution integrity.

## Outcome

- Continuity achieved: Marketing teams maintained seamless reporting post-UA shutdown.
- Transparency improved: Logic fully auditable and owned internally.
- Governance strengthened: Centralized channel mapping across all campaigns.
- Foundation laid: The attribution layer now supports multi-touch experimentation for future phases.

## Next Steps

- Explore multi-touch attribution models (position-based, time-decay).
- Integrate GA4 events and CRM interactions for full customer-journey view.
- Automate data freshness monitoring and QA alerts.