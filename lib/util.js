export const colourObjectToString = (obj) => `rgb(${obj.r}, ${obj.g}, ${obj.b})`;

export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const randomBetweenFloat = (min, max) => (Math.random() * (max - min)) + min;
