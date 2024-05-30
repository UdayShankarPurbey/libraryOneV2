import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cultural-archives',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cultural-archives.component.html',
  styleUrl: './cultural-archives.component.css'
})
export class CulturalArchivesComponent {
  cards =  [
    {
      "image": "https://source.unsplash.com/random/?nations",
      "title": "Discover the Diverse Nations of the World",
      "description": "Explore the rich cultural tapestry of countries around the globe."
    },
    {
      "image": "https://source.unsplash.com/random/?vibrant",
      "title": "Journey Through the Vibrant Lands",
      "description": "Uncover the unique traditions and customs of different nations."
    },
    {
      "image": "https://source.unsplash.com/random/?history",
      "title": "A World of Wonders: Countries to Explore",
      "description": "Discover the beauty, history, and diversity of countries worldwide."
    },
    {
      "image": "https://source.unsplash.com/random/?contries-culture",
      "title": "Global Perspectives: Exploring Nations",
      "description": "Immerse yourself in the fascinating cultures and landscapes of various countries."
    },
    {
      "image": "https://source.unsplash.com/random/?treasure",
      "title": "Unveiling the Treasures of Different Countries",
      "description": "Embark on a journey to understand the unique identities of nations around the world."
    },
    {
      "image": "https://source.unsplash.com/random/?cultures",
      "title": "A World of Endless Possibilities: Countries to Uncover",
      "description": "Explore the rich tapestry of cultures, traditions, and histories of diverse nations."
    },
    {
      "image": "https://source.unsplash.com/random/?stories",
      "title": "Celebrate the Diversity of Nations",
      "description": "Delve into the fascinating stories and characteristics of countries across the globe."
    },
    {
      "image": "https://source.unsplash.com/random/?mysteries-lands",
      "title": "Unravel the Mysteries of Different Lands",
      "description": "Discover the unique identities and captivating features of countries worldwide."
    },
    {
      "image": "https://source.unsplash.com/random/?rich-culture",
      "title": "Embark on a Global Adventure: Explore Countries",
      "description": "Immerse yourself in the rich cultures, histories, and landscapes of nations around the world."
    },
    {
      "image": "https://source.unsplash.com/random/?contries-diversity",
      "title": "A World of Diversity: Uncovering Countries",
      "description": "Delve into the fascinating stories and characteristics of diverse nations across the globe."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-unique-identities",
      "title": "Endless Wonders: Exploring the World's Countries",
      "description": "Discover the unique identities, traditions, and natural marvels of different nations."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-tapestry",
      "title": "Uncover the Tapestry of Global Cultures",
      "description": "Explore the rich histories, customs, and landscapes of countries around the world."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-diverse",
      "title": "A World of Connections: Experiencing Countries",
      "description": "Delve into the fascinating stories and shared experiences of diverse nations."
    },
    {
      "image": "https://source.unsplash.com/random/?countries",
      "title": "Unveiling the Essence of Countries",
      "description": "Immerse yourself in the unique identities and captivating features of nations worldwide."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-Discover",
      "title": "Exploring the Global Tapestry: Countries to Discover",
      "description": "Uncover the rich cultural, historical, and natural wonders of different lands."
    },
    {
      "image": "https://source.unsplash.com/random/?countries",
      "title": "A World of Possibilities: Discovering Countries",
      "description": "Embark on a journey to explore the diverse landscapes, histories, and people of nations around the globe."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-Unveiling",
      "title": "Unveiling the Essence of Worldwide Countries",
      "description": "Delve into the unique traditions, stories, and characteristics that define nations across the world."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-Experiencing",
      "title": "Experiencing the Diversity of Global Countries",
      "description": "Explore the rich cultural, historical, and natural treasures that make each country unique."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-Connections",
      "title": "A World of Connections: Unraveling Countries",
      "description": "Discover the interconnected stories and shared experiences that link nations together."
    },
    {
      "image": "https://source.unsplash.com/random/?countries-Immerse",
      "title": "Unveiling the Wonders of Countries Worldwide",
      "description": "Immerse yourself in the captivating landscapes, histories, and people that define the global community."
    }
  ];

  visibleCards : any  = [];
  currentIndex = 0;
  numberOfVisibleCards = 5;

  ngOnInit() {
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    this.visibleCards = [];
    for (let i = 0; i < this.numberOfVisibleCards; i++) {
      this.visibleCards.push(this.cards[(this.currentIndex + i) % this.cards.length]);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateVisibleCards();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateVisibleCards();
  }

}
