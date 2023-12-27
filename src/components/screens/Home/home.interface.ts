import { IGalleryItem } from "@/components/ui/gallery/gallery.interface";
import { ISlide } from "@/components/ui/slider/slidet.interface";

export interface IHome {
    slides: ISlide[]
    trendingMovies: IGalleryItem[]
    actors: IGalleryItem[]
}