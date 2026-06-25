import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('expo',   '0.16, 1, 0.3, 1');
CustomEase.create('snap',   '0.87, 0, 0.13, 1');
CustomEase.create('spring', '0.34, 1.56, 0.64, 1');

export { gsap, ScrollTrigger, CustomEase };
