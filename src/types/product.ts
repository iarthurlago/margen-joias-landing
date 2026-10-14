export interface Product {
  id: string;
  name: string;
  category: string;
  consultationUrl: string;
  note: string;
  image: {
    src: string;
    srcSet: string;
    alt: string;
    width: number;
    height: number;
  };
}
