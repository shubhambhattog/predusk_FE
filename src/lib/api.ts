// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export interface Profile {
    name: string;
    email: string;
    education: string;
    links: {
        github: string;
        linkedin: string;
        portfolio: string;
    };
}

export interface Skill {
    id: number;
    name: string;
    projectCount?: number;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    link: string;
    skills: string[];
    createdAt: string;
}

export interface Work {
    id: number;
    company: string;
    role: string;
    duration: string;
    description: string;
}

export interface SearchResults {
    query: string;
    results: {
        projects: Project[];
        skills: Skill[];
        work: Work[];
    };
    counts: {
        projects: number;
        skills: number;
        work: number;
        total: number;
    };
}

export async function getProfile(): Promise<Profile> {
    const res = await fetch(`${API_URL}/profile`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
}

export async function getSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_URL}/skills`);
    if (!res.ok) throw new Error("Failed to fetch skills");
    return res.json();
}

export async function getTopSkills(): Promise<Skill[]> {
    const res = await fetch(`${API_URL}/skills/top`);
    if (!res.ok) throw new Error("Failed to fetch top skills");
    return res.json();
}

export async function getProjects(skill?: string): Promise<Project[]> {
    const url = skill
        ? `${API_URL}/projects?skill=${encodeURIComponent(skill)}`
        : `${API_URL}/projects`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
}

export async function getWork(): Promise<Work[]> {
    const res = await fetch(`${API_URL}/work`);
    if (!res.ok) throw new Error("Failed to fetch work");
    return res.json();
}

export async function search(query: string): Promise<SearchResults> {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    return res.json();
}

export async function getHealth(): Promise<{ status: string }> {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
}
