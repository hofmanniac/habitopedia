---
layout: page
title: Habit Rings
icon: fas fa-bullseye
order: 3
permalink: /rings/
---

<style>
.rings-hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  margin-bottom: 3rem;
}

.rings-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.rings-hero p {
  font-size: 1.1rem;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto;
}

.rings-visualization {
  display: grid;
  grid-template-columns: 200px 1fr 300px;
  gap: 2rem;
  align-items: center;
  margin: 3rem 0;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 20px;
}

.ring-selectors {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ring-selector-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--card-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  font-weight: 600;
}

.ring-selector-btn:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px var(--shadow-medium);
}

.ring-selector-btn.active {
  border-color: var(--ring-color);
  background: var(--ring-bg);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ring-selector-btn .icon {
  font-size: 1.5rem;
}

.concentric-circles {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.ring-circle {
  position: absolute;
  border-radius: 50%;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.3s ease;
  opacity: 0.3;
}

.ring-circle.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  z-index: 10;
}

.ring-0 {
  width: 120px;
  height: 120px;
  background: #1a1a1a;
  border-color: #1a1a1a;
  color: white;
  z-index: 4;
  font-size: 0.9rem;
}

.ring-0.active {
  background: #1a1a1a;
}

.ring-1 {
  width: 220px;
  height: 220px;
  background: rgba(45, 90, 166, 0.9);
  border-color: #2d5aa6;
  color: white;
  z-index: 3;
  font-size: 0.85rem;
}

.ring-1.active {
  background: #2d5aa6;
}

.ring-2 {
  width: 320px;
  height: 320px;
  background: rgba(90, 138, 198, 0.7);
  border-color: #5a8ac6;
  color: white;
  z-index: 2;
  font-size: 0.8rem;
}

.ring-2.active {
  background: #5a8ac6;
}

.ring-3 {
  width: 400px;
  height: 400px;
  background: rgba(138, 180, 230, 0.5);
  border-color: #8ab4e6;
  color: #1a1a1a;
  z-index: 1;
  font-size: 0.75rem;
}

.ring-3.active {
  background: #8ab4e6;
}

.ring-description {
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  border-left: 4px solid var(--ring-color, var(--accent-color));
}

.ring-description h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  color: var(--ring-color, var(--accent-color));
}

.ring-description p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.ring-section {
  margin: 4rem 0;
  display: none;
}

.ring-section.active {
  display: block;
}

.ring-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(to right, var(--ring-color), transparent);
}

.ring-icon {
  font-size: 2rem;
}

.ring-info h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-primary);
}

.ring-info p {
  margin: 0.5rem 0 0 0;
  opacity: 0.8;
  color: var(--text-primary);
}

.empty-ring {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-style: italic;
  background: var(--bg-secondary);
  border-radius: 12px;
}

/* Ensure habit cards match site-wide styling */
.ring-section .habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem 1.5rem;
  margin: 2rem 0;
}

.ring-section .habit-card-title {
  font-size: 1rem !important;
  margin: 0.4rem 0;
  font-weight: 700;
  line-height: 1.3;
}

.ring-section .habit-card-description {
  font-size: 0.8rem !important;
  line-height: 1.4;
}

.ring-section .habit-code-small {
  font-size: 0.7rem !important;
}

.ring-section .category-icon {
  font-size: 1.2rem !important;
}

@media (max-width: 768px) {
  .rings-visualization {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .ring-selectors {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .ring-selector-btn {
    flex-shrink: 0;
    min-width: 140px;
  }
  
  .concentric-circles {
    width: 300px;
    height: 300px;
  }
  
  .ring-0 { width: 90px; height: 90px; font-size: 0.75rem; }
  .ring-1 { width: 165px; height: 165px; font-size: 0.7rem; }
  .ring-2 { width: 240px; height: 240px; font-size: 0.65rem; }
  .ring-3 { width: 300px; height: 300px; font-size: 0.6rem; }
  
  .rings-hero h1 {
    font-size: 1.8rem;
  }
}
</style>

<div class="rings-hero">
  <h1>🎯 Habit Rings</h1>
  <p>Habits organized by foundational importance. Start with Ring 0 — the non-negotiable keystones that form the foundation of wellbeing.</p>
</div>

<div class="rings-visualization">
  <div class="ring-selectors">
    {% assign rings_sorted_viz = site.data.rings | sort: "level" %}
    {% for ring in rings_sorted_viz %}
    <button class="ring-selector-btn{% if ring.level == 0 %} active{% endif %}" 
            data-ring="{{ ring.level }}"
            style="--ring-color: {{ ring.color }}; --ring-bg: {{ ring.color }}10;">
      <span class="icon">{{ ring.icon }}</span>
      <span>{{ ring.short_name }}</span>
    </button>
    {% endfor %}
  </div>
  
  <div class="concentric-circles">
    <div class="ring-circle ring-3" data-ring="3">Ring 3<br>Specialized</div>
    <div class="ring-circle ring-2" data-ring="2">Ring 2<br>Advanced</div>
    <div class="ring-circle ring-1" data-ring="1">Ring 1<br>Core</div>
    <div class="ring-circle ring-0 active" data-ring="0">Ring 0<br>Foundation</div>
  </div>
  
  <div class="ring-description" id="ring-description" style="--ring-color: #1a1a1a;">
    {% assign ring_0 = site.data.rings | where: "level", 0 | first %}
    <h3>{{ ring_0.short_name }}: {{ ring_0.name }}</h3>
    <p>{{ ring_0.description }}</p>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const selectorButtons = document.querySelectorAll('.ring-selector-btn');
  const ringCircles = document.querySelectorAll('.ring-circle');
  const descriptionPanel = document.getElementById('ring-description');
  
  const ringData = {
    {% for ring in site.data.rings %}
    {{ ring.level }}: {
      name: "{{ ring.short_name }}: {{ ring.name }}",
      description: "{{ ring.description }}",
      color: "{{ ring.color }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  };
  
  function activateRing(level) {
    // Update buttons
    selectorButtons.forEach(btn => {
      if (btn.dataset.ring === level.toString()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // Update circles
    ringCircles.forEach(circle => {
      if (circle.dataset.ring === level.toString()) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    
    // Update description
    const data = ringData[level];
    descriptionPanel.style.setProperty('--ring-color', data.color);
    descriptionPanel.innerHTML = `
      <h3>${data.name}</h3>
      <p>${data.description}</p>
    `;
    
    // Filter ring sections below
    const ringSections = document.querySelectorAll('.ring-section');
    ringSections.forEach(section => {
      if (section.dataset.ring === level.toString()) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }
  
  selectorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const level = parseInt(this.dataset.ring);
      activateRing(level);
    });
  });
});
</script>

{% assign published_habits = site.habits | where_exp: "h", "h.published == true and h.title.size > 0" %}
{% assign rings_sorted = site.data.rings | sort: "level" %}

{% for ring in rings_sorted %}
  {% assign ring_habits = published_habits | where: "ring", ring.level | sort: "title" %}
  
  <div class="ring-section{% if ring.level == 0 %} active{% endif %}" data-ring="{{ ring.level }}">
    <div class="ring-header" style="--ring-color: {{ ring.color }}20;">
      <div class="ring-icon" style="color: {{ ring.color }}">{{ ring.icon }}</div>
      <div class="ring-info">
        <h2>{{ ring.short_name }}: {{ ring.name }}</h2>
        <p>{{ ring.description }}</p>
        <p><strong>{{ ring_habits.size }}</strong> habit{% if ring_habits.size != 1 %}s{% endif %}</p>
      </div>
    </div>
    
    {% if ring_habits.size > 0 %}
      <div class="habits-grid">
        {% for habit in ring_habits %}
          {% include habit-card.html habit=habit %}
        {% endfor %}
      </div>
    {% else %}
      <div class="empty-ring">
        No habits in this ring yet. As the catalog grows, habits will be assigned here.
      </div>
    {% endif %}
  </div>
{% endfor %}
