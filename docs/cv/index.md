# Giovanni's Résumé

Welcome to the data version of my professional story that is modular, versioned, and open for exploration.  
Here you’ll find tailored views of my experience, projects, and career evolution.

---

**{{ cv.title }}**  
{{ cv.location }}  
📧 [{{ cv.email }}](mailto:{{ cv.email }})  
📞 {{ cv.phone }}

---

## Summary

{{ cv.summary }}

---

## Professional Journey

<!--
```mermaid
%%{init: {'look':'handDrawn','theme':'forest'}}%%
timeline
  title Career Path
  2004 : GE Aviation — Design Engineer (Aerospace Systems)
  2010 : Kantonsspital Aarau — Clinical Engineering
  2019 : JobCloud AG — Data Engineer (Web Tracking & Analytics)
  2026 : Next Step — Leading Data Teams
```
-->

![Gio's Path](../assets/images/career_path_hand.png)

{% for job in cv.experience %}

### {{ job.role }} — {{ job.company }}

*{{ job.years }}*
{% for h in job.highlights %}

- {{ h }}
  
{% endfor %}
{% endfor %}

## Education

{% for ed in cv.education %}

- **{{ ed.program }}**, {{ ed.institution }} ({{ ed.years }})
  
{% endfor %}

## Personality at Work

> “Giovanni is both analytical and open — he thrives where logic meets creativity.”

- Quick to decide, yet thoughtful in judgment.
- Flexible problem solver with humor and optimism.
- Likes turning complex technical data into accessible stories.

---
Jump to [Projects](../projects/index.md)
