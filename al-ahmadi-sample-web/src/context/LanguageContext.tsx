import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isArabic: boolean;
  t: (key: string) => string;
}

/* eslint-disable */
const enTranslations: Record<string, string> = {
  'nav.about': 'About',
  'nav.themedNights': 'Themed Nights',
  'nav.location': 'Location & Hours',
  'nav.bookTable': 'Book a Table',
  'nav.restaurantName': 'Al Ahmadi',

  'hero.tagline': 'A World of Flavors Awaits',
  'hero.subtitle': 'An extraordinary international buffet experience inside the prestigious Crowne Plaza Kuwait',
  'hero.cta': 'Book a Table',
  'hero.scrollDown': 'Scroll to explore',
  'hero.badge': 'At Crowne Plaza Kuwait',

  'about.label': 'Our Story',
  'about.title': 'Where Luxury Meets Global Cuisine',
  'about.divider': '\u25C6',
  'about.p1': 'Nestled within the iconic Crowne Plaza Kuwait, Al Ahmadi International Restaurant is a culinary landmark where the world\'s finest flavors converge. Our expansive international buffet brings together the richest traditions of global cuisine under one magnificent roof.',
  'about.p2': 'From the aromatic spices of the Middle East to the delicate artistry of Asian cuisine, from Mediterranean freshness to hearty European classics \u2014 every visit is a passport to extraordinary taste, crafted by our world-class team of chefs.',
  'about.stat1': 'Cuisines Worldwide',
  'about.stat2': 'Chef Specialists',
  'about.stat3': 'Years of Excellence',
  'about.stat4': 'Happy Guests Daily',
  'about.imageCaption': 'Crowne Plaza Kuwait',

  'themed.label': 'Themed Nights',
  'themed.title': 'An Evening to Remember',
  'themed.subtitle': 'Each night tells a different story \u2014 a curated journey through the world\'s most beloved culinary traditions, presented with the elegance befitting Crowne Plaza.',
  'themed.cta': 'View Full Schedule',
  'themed.perPerson': 'per person',
  'themed.reserveNight': 'Reserve This Night',
  'themed.sunday.name': 'Seafood Night',
  'themed.sunday.day': 'Every Sunday',
  'themed.sunday.desc': 'Dive into an ocean of flavors \u2014 fresh oysters, king crab, lobster bisque, and premium seafood stations curated from the world\'s finest waters.',
  'themed.sunday.tag': 'Sunday Signature',
  'themed.monday.name': 'BBQ & Grill Night',
  'themed.monday.day': 'Every Monday',
  'themed.monday.desc': 'Slow-smoked ribs, prime cuts, and artisan sausages from live grill stations set under ambient lighting \u2014 a carnivore\'s celebration.',
  'themed.monday.tag': 'Monday Sizzle',
  'themed.tuesday.name': 'Asian Fusion Night',
  'themed.tuesday.day': 'Every Tuesday',
  'themed.tuesday.desc': 'From Tokyo sashimi bars to Thai curry stations and live wok performances \u2014 Asia\'s most vibrant flavors in a single breathtaking spread.',
  'themed.tuesday.tag': 'Tuesday Orient',
  'themed.wednesday.name': 'Arabian Night',
  'themed.wednesday.day': 'Every Wednesday',
  'themed.wednesday.desc': 'Savor a grand Arabic mezze spread, slow-cooked ouzi, rich shawarma, and fragrant biryanis that honor centuries of culinary heritage.',
  'themed.wednesday.tag': 'Wednesday Heritage',
  'themed.thursday.name': 'Mediterranean Night',
  'themed.thursday.day': 'Every Thursday',
  'themed.thursday.desc': 'Sun-kissed flavors of the Mediterranean coast \u2014 fresh pasta stations, wood-fired dishes, and vibrant salads bursting with color.',
  'themed.thursday.tag': 'Thursday Riviera',
  'themed.friday.name': 'International Gala',
  'themed.friday.day': 'Every Friday',
  'themed.friday.desc': 'Our grandest spread \u2014 a world on one table. Live cooking stations, exquisite dessert towers, and flavors from every corner of the globe.',
  'themed.friday.tag': 'Friday Gala',

  'location.label': 'Find Us',
  'location.title': 'Location & Opening Hours',
  'location.subtitle': 'Conveniently situated in the heart of Kuwait City, inside the prestigious Crowne Plaza Kuwait \u2014 the address of distinction.',
  'location.hoursTitle': 'Opening Hours',
  'location.contactTitle': 'Contact & Reservations',
  'location.everyday': 'Breakfast',
  'location.breakfastTime': '6:30 AM \u2013 10:30 AM',
  'location.lunch': 'Lunch',
  'location.lunchTime': '12:30 PM \u2013 3:30 PM',
  'location.dinner': 'Dinner',
  'location.dinnerTime': '7:00 PM \u2013 11:00 PM',
  'location.friBreakfast': 'Friday Brunch',
  'location.friBreakfastTime': '12:00 PM \u2013 4:00 PM',
  'location.address': 'Crowne Plaza Kuwait, Fahad Al-Salem Street, Kuwait City',
  'location.phone': '+965 2244 5555',
  'location.email': 'dining@alahmadirestaurant.com',
  'location.bookNow': 'Book a Table Now',
  'location.daily': 'Daily',
  'location.friSat': 'Fri & Sat',

  'footer.tagline': 'A World of Flavors Awaits',
  'footer.description': 'An international luxury buffet experience nestled inside the prestigious Crowne Plaza Kuwait.',
  'footer.quickLinks': 'Quick Links',
  'footer.contact': 'Contact Us',
  'footer.rights': '\u00A9 2025 Al Ahmadi International Restaurant. All rights reserved.',
  'footer.crownePlaza': 'Part of Crowne Plaza Kuwait',
  'footer.home': 'Home',
  'footer.about': 'About Us',
  'footer.themedNights': 'Themed Nights',
  'footer.location': 'Location',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
};

const arTranslations: Record<string, string> = {
  'nav.about': '\u0639\u0646 \u0627\u0644\u0645\u0637\u0639\u0645',
  'nav.themedNights': '\u0627\u0644\u0644\u064a\u0627\u0644\u064a \u0627\u0644\u0645\u0645\u064a\u0632\u0629',
  'nav.location': '\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0623\u0648\u0642\u0627\u062a',
  'nav.bookTable': '\u0627\u062d\u062c\u0632 \u0637\u0627\u0648\u0644\u0629',
  'nav.restaurantName': '\u0627\u0644\u0623\u062d\u0645\u062f\u064a',

  'hero.tagline': '\u0639\u0627\u0644\u0645 \u0645\u0646 \u0627\u0644\u0646\u0643\u0647\u0627\u062a \u064a\u0633\u062a\u0642\u0628\u0644\u0643',
  'hero.subtitle': '\u062a\u062c\u0631\u0628\u0629 \u0628\u0648\u0641\u064a\u0647 \u062f\u0648\u0644\u064a\u0629 \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0629 \u0641\u064a \u0642\u0644\u0628 \u0641\u0646\u062f\u0642 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a',
  'hero.cta': '\u0627\u062d\u062c\u0632 \u0637\u0627\u0648\u0644\u062a\u0643',
  'hero.scrollDown': '\u0627\u0633\u062a\u0643\u0634\u0641 \u0623\u0643\u062b\u0631',
  'hero.badge': '\u0641\u064a \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a',

  'about.label': '\u0642\u0635\u062a\u0646\u0627',
  'about.title': '\u062d\u064a\u062b \u064a\u0644\u062a\u0642\u064a \u0627\u0644\u0641\u062e\u0627\u0645\u0629 \u0628\u0627\u0644\u0645\u0637\u0628\u062e \u0627\u0644\u0639\u0627\u0644\u0645\u064a',
  'about.divider': '\u25C6',
  'about.p1': '\u064a\u0642\u0639 \u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a \u0627\u0644\u062f\u0648\u0644\u064a \u0641\u064a \u0642\u0644\u0628 \u0641\u0646\u062f\u0642 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a \u0627\u0644\u0623\u064a\u0642\u0648\u0646\u064a\u060c \u0644\u064a\u0643\u0648\u0646 \u0648\u062c\u0647\u0629\u064b \u062a\u062c\u0645\u0639 \u0623\u0631\u0642\u0649 \u0646\u0643\u0647\u0627\u062a \u0627\u0644\u0639\u0627\u0644\u0645 \u062a\u062d\u062a \u0633\u0642\u0641 \u0648\u0627\u062d\u062f. \u064a\u0642\u062f\u0651\u0645 \u0627\u0644\u0645\u0637\u0639\u0645 \u0628\u0648\u0641\u064a\u0647\u064b \u062f\u0648\u0644\u064a\u064b\u0627 \u0645\u0648\u0633\u0651\u0639\u064b\u0627 \u064a\u0636\u0645\u0651 \u0623\u0639\u0631\u0642 \u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0645\u0637\u0628\u062e \u0627\u0644\u0639\u0627\u0644\u0645\u064a.',
  'about.p2': '\u0645\u0646 \u0639\u0628\u0642 \u062a\u0648\u0627\u0628\u0644 \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u0625\u0644\u0649 \u0627\u0644\u0641\u0646 \u0627\u0644\u0631\u0642\u064a\u0642 \u0644\u0644\u0645\u0637\u0628\u062e \u0627\u0644\u0622\u0633\u064a\u0648\u064a\u060c \u0648\u0645\u0646 \u0646\u0636\u0627\u0631\u0629 \u0627\u0644\u0645\u062a\u0648\u0633\u0637 \u0625\u0644\u0649 \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a\u0627\u062a \u0627\u0644\u0623\u0648\u0631\u0648\u0628\u064a\u0629 \u0627\u0644\u0623\u0635\u064a\u0644\u0629 \u2014 \u0643\u0644 \u0632\u064a\u0627\u0631\u0629 \u0631\u062d\u0644\u0629 \u0634\u0647\u064a\u0629 \u0644\u0627 \u062a\u064f\u0646\u0633\u0649\u060c \u064a\u064f\u0639\u062f\u0651\u0647\u0627 \u0644\u0643\u0645 \u0646\u062e\u0628\u0629 \u0645\u0646 \u0627\u0644\u0637\u0647\u0627\u0629 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u064a\u0646.',
  'about.stat1': '\u0645\u0637\u0628\u062e \u0639\u0627\u0644\u0645\u064a',
  'about.stat2': '\u0637\u0627\u0647\u064d \u0645\u062a\u062e\u0635\u0635',
  'about.stat3': '\u0633\u0646\u0648\u0627\u062a \u0645\u0646 \u0627\u0644\u062a\u0645\u064a\u0632',
  'about.stat4': '\u0636\u064a\u0641 \u0633\u0639\u064a\u062f \u064a\u0648\u0645\u064a\u064b\u0627',
  'about.imageCaption': '\u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a',

  'themed.label': '\u0627\u0644\u0644\u064a\u0627\u0644\u064a \u0627\u0644\u0645\u0645\u064a\u0632\u0629',
  'themed.title': '\u0645\u0633\u0627\u0621 \u0644\u0627 \u064a\u064f\u0646\u0633\u0649',
  'themed.subtitle': '\u0643\u0644 \u0644\u064a\u0644\u0629 \u062a\u062d\u0643\u064a \u0642\u0635\u0629 \u0645\u062e\u062a\u0644\u0641\u0629 \u2014 \u0631\u062d\u0644\u0629 \u0645\u0645\u064a\u0632\u0629 \u0639\u0628\u0631 \u0623\u0628\u0631\u0632 \u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0637\u0647\u0648\u064a\u0629 \u0641\u064a \u0627\u0644\u0639\u0627\u0644\u0645\u060c \u0645\u0642\u062f\u064e\u0651\u0645\u0629 \u0628\u0623\u0646\u0627\u0642\u0629 \u062a\u0644\u064a\u0642 \u0628\u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627.',
  'themed.cta': '\u0639\u0631\u0636 \u0627\u0644\u062c\u062f\u0648\u0644 \u0627\u0644\u0643\u0627\u0645\u0644',
  'themed.perPerson': '\u0644\u0644\u0634\u062e\u0635',
  'themed.reserveNight': '\u0627\u062d\u062c\u0632 \u0647\u0630\u0647 \u0627\u0644\u0644\u064a\u0644\u0629',
  'themed.sunday.name': '\u0644\u064a\u0644\u0629 \u0627\u0644\u0645\u0623\u0643\u0648\u0644\u0627\u062a \u0627\u0644\u0628\u062d\u0631\u064a\u0629',
  'themed.sunday.day': '\u0643\u0644 \u0623\u062d\u062f',
  'themed.sunday.desc': '\u0627\u0633\u062a\u0645\u062a\u0639 \u0628\u0646\u0643\u0647\u0627\u062a \u0627\u0644\u0645\u062d\u064a\u0637 \u2014 \u0645\u062d\u0627\u0631 \u0637\u0627\u0632\u062c\u060c \u0643\u0627\u0628 \u0643\u064a\u0646\u062c\u060c \u0634\u0648\u0631\u0628\u0629 \u0644\u0648\u0628\u0633\u062a\u0631\u060c \u0648\u0645\u062d\u0637\u0627\u062a \u0645\u0623\u0643\u0648\u0644\u0627\u062a \u0628\u062d\u0631\u064a\u0629 \u0641\u0627\u062e\u0631\u0629.',
  'themed.sunday.tag': '\u062a\u0648\u0642\u064a\u0639 \u0627\u0644\u0623\u062d\u062f',
  'themed.monday.name': '\u0644\u064a\u0644\u0629 \u0627\u0644\u0634\u0648\u0627\u0621 \u0648\u0627\u0644\u0645\u0634\u0627\u0648\u064a',
  'themed.monday.day': '\u0643\u0644 \u0627\u062b\u0646\u064a\u0646',
  'themed.monday.desc': '\u0623\u0636\u0644\u0627\u0639 \u0645\u062f\u062e\u0651\u0646\u0629 \u0628\u0628\u0637\u0621\u060c \u0623\u062c\u0648\u062f \u0627\u0644\u0642\u0637\u0639\u0627\u062a\u060c \u0648\u0646\u0642\u0627\u0646\u0642 \u062d\u0631\u0641\u064a\u0629 \u0645\u0646 \u0645\u062d\u0637\u0627\u062a \u0627\u0644\u0634\u0648\u0627\u0621 \u0627\u0644\u062d\u064a\u0629 \u2014 \u0627\u062d\u062a\u0641\u0627\u0644 \u0644\u0645\u062d\u0628\u064a \u0627\u0644\u0644\u062d\u0648\u0645.',
  'themed.monday.tag': '\u0634\u0639\u0644\u0629 \u0627\u0644\u0627\u062b\u0646\u064a\u0646',
  'themed.tuesday.name': '\u0644\u064a\u0644\u0629 \u0627\u0644\u0641\u064a\u0648\u062c\u0646 \u0627\u0644\u0622\u0633\u064a\u0648\u064a',
  'themed.tuesday.day': '\u0643\u0644 \u062b\u0644\u0627\u062b\u0627\u0621',
  'themed.tuesday.desc': '\u0645\u0646 \u0633\u0644\u0637\u0629 \u0633\u0648\u0634\u064a \u0637\u0648\u0643\u064a\u0648 \u0625\u0644\u0649 \u0645\u062d\u0637\u0627\u062a \u0627\u0644\u0643\u0627\u0631\u064a \u0627\u0644\u062a\u0627\u064a\u0644\u0627\u0646\u062f\u064a \u0648\u0639\u0631\u0648\u0636 \u0627\u0644\u0648\u0643 \u0627\u0644\u062d\u064a\u0629 \u2014 \u0623\u0628\u0631\u0632 \u0646\u0643\u0647\u0627\u062a \u0622\u0633\u064a\u0627 \u0641\u064a \u0636\u064a\u0627\u0641\u0629 \u0648\u0627\u062d\u062f\u0629.',
  'themed.tuesday.tag': '\u0634\u0631\u0642 \u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621',
  'themed.wednesday.name': '\u0627\u0644\u0644\u064a\u0644\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629',
  'themed.wednesday.day': '\u0643\u0644 \u0623\u0631\u0628\u0639\u0627\u0621',
  'themed.wednesday.desc': '\u062a\u0630\u0648\u0651\u0642 \u0645\u0632\u0629 \u0639\u0631\u0628\u064a\u0629 \u0641\u0627\u062e\u0631\u0629\u060c \u0623\u0648\u0632\u064a \u0645\u0637\u0628\u0648\u062e\u064b\u0627 \u0639\u0644\u0649 \u0646\u0627\u0631 \u0647\u0627\u062f\u0626\u0629\u060c \u0634\u0627\u0648\u0631\u0645\u0627 \u0634\u0647\u064a\u0629\u060c \u0648\u0628\u0631\u064a\u0627\u0646\u064a \u0639\u0637\u0631\u064a\u064b\u0627 \u064a\u064f\u0643\u0631\u0651\u0645 \u0642\u0631\u0648\u0646\u064b\u0627 \u0645\u0646 \u0627\u0644\u0645\u0648\u0631\u0648\u062b \u0627\u0644\u0637\u0647\u0648\u064a.',
  'themed.wednesday.tag': '\u062a\u0631\u0627\u062b \u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621',
  'themed.thursday.name': '\u0644\u064a\u0644\u0629 \u0627\u0644\u0645\u062a\u0648\u0633\u0637',
  'themed.thursday.day': '\u0643\u0644 \u062e\u0645\u064a\u0633',
  'themed.thursday.desc': '\u0646\u0643\u0647\u0627\u062a \u0633\u0627\u062d\u0644 \u0627\u0644\u0645\u062a\u0648\u0633\u0637 \u0627\u0644\u0645\u0634\u0645\u0633\u0629 \u2014 \u0645\u062d\u0637\u0627\u062a \u0645\u0643\u0631\u0648\u0646\u0629 \u0637\u0627\u0632\u062c\u0629\u060c \u0623\u0637\u0628\u0627\u0642 \u0645\u0646 \u0627\u0644\u0641\u0631\u0646\u060c \u0648\u0633\u0644\u0637\u0627\u062a \u0646\u0627\u0628\u0636\u0629 \u0628\u0627\u0644\u062d\u064a\u0627\u0629 \u0648\u0627\u0644\u0623\u0644\u0648\u0627\u0646.',
  'themed.thursday.tag': '\u0631\u064a\u0641\u064a\u064a\u0631\u0627 \u0627\u0644\u062e\u0645\u064a\u0633',
  'themed.friday.name': '\u0627\u0644\u062c\u0627\u0644\u0627 \u0627\u0644\u062f\u0648\u0644\u064a\u0629',
  'themed.friday.day': '\u0643\u0644 \u062c\u0645\u0639\u0629',
  'themed.friday.desc': '\u0623\u0648\u0633\u0639 \u0628\u0648\u0641\u064a\u0647\u0627\u062a\u0646\u0627 \u2014 \u0627\u0644\u0639\u0627\u0644\u0645 \u0639\u0644\u0649 \u0637\u0627\u0648\u0644\u0629 \u0648\u0627\u062d\u062f\u0629. \u0645\u062d\u0637\u0627\u062a \u0637\u0647\u064a \u062d\u064a\u0629\u060c \u0623\u0628\u0631\u0627\u062c \u062d\u0644\u0648\u0649 \u0641\u0627\u062e\u0631\u0629\u060c \u0648\u0646\u0643\u0647\u0627\u062a \u0645\u0646 \u0643\u0644 \u0631\u0643\u0646 \u0645\u0646 \u0623\u0631\u062c\u0627\u0621 \u0627\u0644\u0645\u0639\u0645\u0648\u0631\u0629.',
  'themed.friday.tag': '\u062c\u0627\u0644\u0627 \u0627\u0644\u062c\u0645\u0639\u0629',

  'location.label': '\u0627\u0639\u062b\u0631 \u0639\u0644\u064a\u0646\u0627',
  'location.title': '\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0645\u0644',
  'location.subtitle': '\u064a\u0642\u0639 \u0627\u0644\u0645\u0637\u0639\u0645 \u0641\u064a \u0642\u0644\u0628 \u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0643\u0648\u064a\u062a\u060c \u062f\u0627\u062e\u0644 \u0627\u0644\u0631\u0627\u0626\u0639 \u0641\u0646\u062f\u0642 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a \u2014 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062a\u0645\u064a\u0632 \u0648\u0627\u0644\u0641\u062e\u0627\u0645\u0629.',
  'location.hoursTitle': '\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0645\u0644',
  'location.contactTitle': '\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0648\u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a',
  'location.everyday': '\u0627\u0644\u0625\u0641\u0637\u0627\u0631',
  'location.breakfastTime': '\u0666:\u0663\u0660 \u0635 \u2013 \u0661\u0660:\u0663\u0660 \u0635',
  'location.lunch': '\u0627\u0644\u063a\u062f\u0627\u0621',
  'location.lunchTime': '\u0661\u0662:\u0663\u0660 \u0645 \u2013 \u0663:\u0663\u0660 \u0645',
  'location.dinner': '\u0627\u0644\u0639\u0634\u0627\u0621',
  'location.dinnerTime': '\u0667:\u0660\u0660 \u0645 \u2013 \u0661\u0661:\u0660\u0660 \u0645',
  'location.friBreakfast': '\u0628\u0631\u0646\u0634 \u0627\u0644\u062c\u0645\u0639\u0629',
  'location.friBreakfastTime': '\u0661\u0662:\u0660\u0660 \u0645 \u2013 \u0664:\u0660\u0660 \u0645',
  'location.address': '\u0641\u0646\u062f\u0642 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a\u060c \u0634\u0627\u0631\u0639 \u0641\u0647\u062f \u0627\u0644\u0633\u0627\u0644\u0645\u060c \u0645\u062f\u064a\u0646\u0629 \u0627\u0644\u0643\u0648\u064a\u062a',
  'location.phone': '+965 2244 5555',
  'location.email': 'dining@alahmadirestaurant.com',
  'location.bookNow': '\u0627\u062d\u062c\u0632 \u0637\u0627\u0648\u0644\u0629 \u0627\u0644\u0622\u0646',
  'location.daily': '\u064a\u0648\u0645\u064a\u064b\u0627',
  'location.friSat': '\u0627\u0644\u062c\u0645\u0639\u0629 \u0648\u0627\u0644\u0633\u0628\u062a',

  'footer.tagline': '\u0639\u0627\u0644\u0645 \u0645\u0646 \u0627\u0644\u0646\u0643\u0647\u0627\u062a \u064a\u0633\u062a\u0642\u0628\u0644\u0643',
  'footer.description': '\u062a\u062c\u0631\u0628\u0629 \u0628\u0648\u0641\u064a\u0647 \u0641\u0627\u062e\u0631\u0629 \u062f\u0648\u0644\u064a\u0629 \u0641\u064a \u0642\u0644\u0628 \u0641\u0646\u062f\u0642 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a.',
  'footer.quickLinks': '\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064a\u0639\u0629',
  'footer.contact': '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
  'footer.rights': '\u00A9 \u0662\u0660\u0662\u0665 \u0645\u0637\u0639\u0645 \u0627\u0644\u0623\u062d\u0645\u062f\u064a \u0627\u0644\u062f\u0648\u0644\u064a. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.',
  'footer.crownePlaza': '\u062c\u0632\u0621 \u0645\u0646 \u0643\u0631\u0627\u0648\u0646 \u0628\u0644\u0627\u0632\u0627 \u0627\u0644\u0643\u0648\u064a\u062a',
  'footer.home': '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
  'footer.about': '\u0639\u0646 \u0627\u0644\u0645\u0637\u0639\u0645',
  'footer.themedNights': '\u0627\u0644\u0644\u064a\u0627\u0644\u064a \u0627\u0644\u0645\u0645\u064a\u0632\u0629',
  'footer.location': '\u0627\u0644\u0645\u0648\u0642\u0639',
  'footer.privacy': '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629',
  'footer.terms': '\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const isArabic = language === 'ar';

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isArabic) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      body.setAttribute('dir', 'rtl');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
      body.setAttribute('dir', 'ltr');
    }
  }, [isArabic]);

  const t = (key: string): string => {
    const dict = isArabic ? arTranslations : enTranslations;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isArabic, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
