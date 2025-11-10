
# {{ cv.name }}

**{{ cv.title }}**  
{{ cv.location }}  
📧 [{{ cv.email }}](mailto:{{ cv.email }})  
📞 {{ cv.phone }}

---

## Summary

{{ cv.summary }}

## Skills

- **Technical:** {{ ", ".join(cv.skills.technical) }}
- **Soft:** {{ ", ".join(cv.skills.soft) }}

## Experience

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

## Projects

{% for p in cv.projects %}

- **{{ p.title }}:** {{ p.description }}
  
{% endfor %}
