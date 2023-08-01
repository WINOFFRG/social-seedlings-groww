import { getPosts } from "./api/posts";
import { getUser, getUserPhotos } from './api/user';

export interface Post {
    id: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    promoted_at: null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: any[];
    urls: Urls;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    user: User;
}

export interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}

export interface User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: null;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: UserLinks;
    profile_image: ProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: Social;
}

export interface UserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface Social {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: string;
    paypal_email: null;
}

// User Type

export interface User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: null;
    twitter_username: string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: WelcomeLinks;
    profile_image: ProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: Social;
    followed_by_user: boolean;
    photos: Photo[];
    badge: null;
    tags: Tags;
    followers_count: number;
    following_count: number;
    allow_messages: boolean;
    numeric_id: number;
    downloads: number;
    meta: Meta;
}

export interface WelcomeLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface Meta {
    index: boolean;
}

export interface Photo {
    id: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    blur_hash: string;
    urls: Urls;
}

export interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}

export interface ProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface Social {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: null | string;
    paypal_email: null;
}

export interface Tags {
    custom: any[];
    aggregated: Aggregated[];
}

export interface Aggregated {
    type: Type;
    title: string;
    source?: Source;
}

export interface Source {
    ancestry: Ancestry;
    title: string;
    subtitle: string;
    description: string;
    meta_title: string;
    meta_description: string;
    cover_photo: CoverPhoto;
}

export interface Ancestry {
    type: Category;
    category: Category;
    subcategory?: Category;
}

export interface Category {
    slug: string;
    pretty_slug: string;
}

export interface CoverPhoto {
    id: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
    promoted_at: null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: any[];
    urls: Urls;
    links: CoverPhotoLinks;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    topic_submissions: TopicSubmissions;
    premium: boolean;
    plus: boolean;
    user: User;
}

export interface CoverPhotoLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface TopicSubmissions {
    'arts-culture'?: ArtsCulture;
}

export interface ArtsCulture {
    status: string;
    approved_on: Date;
}

export interface User {
    id: string;
    updated_at: Date;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: null | string;
    portfolio_url: string;
    bio: string;
    location: string;
    links: WelcomeLinks;
    profile_image: ProfileImage;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: Social;
}

export enum Type {
    LandingPage = 'landing_page',
    Search = 'search',
}

export type Posts = Post[];
export type UserPhoto = CoverPhoto;
export type UserPhotos = UserPhoto[];

export interface UserProfileProps {
    user: User;
    userPhotos: UserPhotos;
    error?: string;
}

export interface ErrorData {
    message: string;
}
