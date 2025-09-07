export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Professional {
  id: string;
  name: string;
  photoUrl: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  address: string;
  phone: string;
  insurances: string[];
  bio: string;
  location: {
    lat: number;
    lng: number;
  };
  reviews: Review[];
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  insurance: string;
  favoriteProfessionals: string[];
}