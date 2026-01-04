
export const tours = [
  {
    slug: "illapani-waterfall-chocolate",
    title: "Illapani Waterfall & Chocolate Farm",
    summary: "A relaxed day hike to a jungle waterfall with a visit to a local chocolate farm.",
    image: "/images/tours/illapani.jpg",
    difficulty: "easy", // easy | moderate | challenging
    price: 45,
    distanceKm: 2,
    meals: { breakfast: 0, lunch: 1, dinner: 0 },
     gallery: [
      "/images/tours/illapani/1.jpg",
      "/images/tours/illapani/2.jpg",
      "/images/tours/illapani/3.jpg"
    ],
    itinerary: [
      "8:00 am pickup from your hotel in Quillabamba",
      "40-minute hike to Illapani Waterfall",
      "Swimming and photos at the waterfall",
      "Visit to Chahuares Chocolate Farm",
      "Traditional Peruvian lunch",
      "Return to Quillabamba around 4:00 pm"
    ]
  },

  


  {
    slug: "duende-waterfall-coffee",
    title: "Duende Waterfall & Coffee Farm",
    summary: "Scenic hike through coffee fields ending at a hidden waterfall.",
    image: "/images/tours/duende.jpg",
    difficulty: "easy", // easy | moderate | challenging
    price: 45,
    distanceKm: 3,
    meals: { breakfast: 0, lunch: 1, dinner: 0 },
    itinerary: [
      "9:00 am hotel pickup",
      "Drive to D’Morveli coffee farm",
      "30-minute hike to Duende Waterfall",
      "Coffee tour with tastings",
      "Traditional lunch",
      "Return to Quillabamba"
    ] 
    gallery: [
      "/images/tours/duende/1.jpg",
      "/images/tours/duende/2.jpg",
      "/images/tours/duende/3.jpg"
  }

  
  {
    slug: "zipline-thermal",
    title: "Canopy Ziplining and Thermal Baths",
    summary: "An adrenaline-inudcing ride above the treetops, followed by a relaxing thermal bath visit",
    image: "/images/tours/zipline.jpg",
    price: 45,
    difficulty: "easy",
    distanceKm: 0,
    meals: { breakfast: 0, lunch: 1, dinner: 0 },
    itinerary: [
      "8:30 am depart from Quillabamba - our shuttle will pick you up from your hotel",
"30 minute drive to the ziplining"
    ]
  gallery: [
      "/images/tours/zipline/1.jpg",
      "/images/tours/zipline/2.jpg",
      "/images/tours/zipline/3.jpg"
  }

  // Add the rest exactly the same way
];
