"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getProfile,
  getProjects,
  getTopSkills,
  getWork,
  search,
  type Profile,
  type Project,
  type Skill,
  type Work,
  type SearchResults
} from "@/lib/api";
import { Github, Linkedin, Globe, Search, Briefcase, Code, GraduationCap, Mail } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [work, setWork] = useState<Work[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [skillFilter, setSkillFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [profileData, projectsData, skillsData, workData] = await Promise.all([
          getProfile(),
          getProjects(),
          getTopSkills(),
          getWork(),
        ]);
        setProfile(profileData);
        setProjects(projectsData);
        setSkills(skillsData);
        setWork(workData);
      } catch (err) {
        setError("Failed to load data. Make sure the API is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await search(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleSkillFilter = async (skillName: string) => {
    setSkillFilter(skillName);
    try {
      const filtered = await getProjects(skillName);
      setProjects(filtered);
    } catch (err) {
      console.error("Filter failed:", err);
    }
  };

  const clearFilter = async () => {
    setSkillFilter("");
    const all = await getProjects();
    setProjects(all);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Run <code className="bg-muted px-1 rounded">pnpm dev</code> in the server folder.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold">Me-API Playground</h1>
            <p className="text-muted-foreground">Personal Profile API Demo</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search - PRD Feature */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </CardTitle>
            <CardDescription>Search across projects, skills, and work experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Search projects, skills, work..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            {searchResults && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">
                    Found {searchResults.counts.total} results for &quot;{searchResults.query}&quot;
                  </p>
                  <Button variant="ghost" size="sm" onClick={() => setSearchResults(null)}>Clear</Button>
                </div>
                {searchResults.results.projects.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-sm mb-1">Projects:</p>
                    <ul className="list-disc list-inside text-sm">
                      {searchResults.results.projects.map((p) => (
                        <li key={p.id}>{p.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {searchResults.results.skills.length > 0 && (
                  <div className="mb-3">
                    <p className="font-medium text-sm mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {searchResults.results.skills.map((s) => (
                        <Badge key={s.id} variant="secondary">{s.name}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {searchResults.results.work.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-1">Work Experience:</p>
                    <ul className="list-disc list-inside text-sm">
                      {searchResults.results.work.map((w) => (
                        <li key={w.id}>{w.role} at {w.company}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card - PRD Feature */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{profile?.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {profile?.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span className="text-sm">{profile?.education}</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Links</p>
                <div className="flex flex-col gap-2">
                  {profile?.links.github && (
                    <a href={profile.links.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:underline">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {profile?.links.linkedin && (
                    <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:underline">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  )}
                  {profile?.links.portfolio && (
                    <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:underline">
                      <Globe className="h-4 w-4" /> Portfolio
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills with Filtering - PRD Feature */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Top Skills
              </CardTitle>
              <CardDescription>Click to filter projects by skill</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant={skillFilter === skill.name ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() =>
                      skillFilter === skill.name ? clearFilter() : handleSkillFilter(skill.name)
                    }
                  >
                    {skill.name} ({skill.projectCount || 0})
                  </Badge>
                ))}
              </div>
              {skillFilter && (
                <p className="mt-4 text-sm text-muted-foreground">
                  Filtering by: <strong>{skillFilter}</strong>
                  <Button variant="ghost" size="sm" onClick={clearFilter} className="ml-2">
                    Clear
                  </Button>
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Projects - PRD Feature */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              {skillFilter ? `Showing projects with ${skillFilter}` : "All projects"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 min-h-[1.75rem]">
                      {project.skills?.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {project.skills && project.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-auto pt-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {projects.length === 0 && (
                <div className="col-span-full py-8 text-center text-muted-foreground">
                  No projects found.
                  {skillFilter && <Button variant="link" onClick={clearFilter}>Clear filter</Button>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work Experience - PRD Feature */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {work.map((w) => (
                <div key={w.id} className="border-l-2 border-primary pl-4">
                  <p className="font-medium">{w.role}</p>
                  <p className="text-sm text-muted-foreground">{w.company} • {w.duration}</p>
                  <p className="text-sm mt-1">{w.description}</p>
                </div>
              ))}
              {work.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No work experience added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer with API Info */}
        <footer className="text-center text-sm text-muted-foreground py-8 border-t">
          <p>Built with Next.js, shadcn/ui, and Express</p>
          <p className="mt-2">
            API Endpoints:{" "}
            <code className="bg-muted px-1 rounded">GET /profile</code> |{" "}
            <code className="bg-muted px-1 rounded">GET /projects?skill=X</code> |{" "}
            <code className="bg-muted px-1 rounded">GET /search?q=X</code> |{" "}
            <code className="bg-muted px-1 rounded">GET /skills/top</code>
          </p>
        </footer>
      </div>
    </main>
  );
}
