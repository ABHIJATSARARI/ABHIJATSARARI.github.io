// External API utilities for auto-syncing portfolio data
// Fetches from Credly, DevPost, and Medium

// ============================================
// CREDLY API (via CORS proxy for client-side)
// ============================================

export interface CredlyBadge {
    id: string;
    name: string;
    image_url: string;
    issuer_name: string;
    issued_at: string;
    badge_url: string;
}

export async function fetchCredlyBadges(username: string): Promise<CredlyBadge[]> {
    try {
        // Credly doesn't allow direct CORS from browsers
        // Use a public CORS proxy or skip if it fails
        const directUrl = `https://www.credly.com/users/${username}/badges.json`;

        // Try direct fetch first (works on server-side)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(directUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                },
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn('Credly API returned non-ok status, using fallback');
                return [];
            }

            const data = await response.json();

            return data.data?.map((badge: {
                id: string;
                badge_template: {
                    name: string;
                    image_url: string;
                    issuer: { name: string };
                };
                issued_at: string;
                badge_url: string;
            }) => ({
                id: badge.id,
                name: badge.badge_template?.name || 'Unknown Badge',
                image_url: badge.badge_template?.image_url || '',
                issuer_name: badge.badge_template?.issuer?.name || 'Unknown Issuer',
                issued_at: badge.issued_at,
                badge_url: badge.badge_url || `https://www.credly.com/badges/${badge.id}`,
            })) || [];
        } catch (fetchError) {
            clearTimeout(timeoutId);
            // CORS or network error - silently use fallback
            console.info('Credly fetch failed (likely CORS), using static data');
            return [];
        }
    } catch (error) {
        // Silent fail - use fallback data
        return [];
    }
}

// ============================================
// MEDIUM RSS FEED
// ============================================

export interface MediumArticle {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    categories: string[];
}

export async function fetchMediumArticles(username: string): Promise<MediumArticle[]> {
    try {
        // Medium RSS feed via rss2json (free tier: 10,000 requests/day)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            const response = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn('Medium RSS API returned non-ok status');
                return [];
            }

            const data = await response.json();

            if (data.status !== 'ok') {
                return [];
            }

            return data.items?.map((item: {
                title: string;
                link: string;
                pubDate: string;
                description: string;
                categories: string[];
            }) => ({
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                description: stripHtml(item.description).slice(0, 200) + '...',
                categories: item.categories || [],
            })) || [];
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.info('Medium fetch failed, using static data');
            return [];
        }
    } catch (error) {
        return [];
    }
}

// ============================================
// GITHUB API
// ============================================

export interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
    total_stars: number;
    total_forks: number;
    total_commits: number;
    languages: Record<string, number>;
    top_repos: {
        name: string;
        description: string;
        stars: number;
        forks: number;
        language: string;
        url: string;
    }[];
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
            // Fetch user data
            const userResponse = await fetch(
                `https://api.github.com/users/${username}`,
                { signal: controller.signal }
            );

            if (!userResponse.ok) {
                clearTimeout(timeoutId);
                console.warn('GitHub API returned non-ok status');
                return null;
            }

            const userData = await userResponse.json();

            // Fetch repos
            const reposResponse = await fetch(
                `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);

            const repos = await reposResponse.json();

            if (!Array.isArray(repos)) {
                return null;
            }

            // Calculate stats
            let totalStars = 0;
            let totalForks = 0;
            const languages: Record<string, number> = {};

            repos.forEach((repo: { stargazers_count: number; forks_count: number; language: string | null }) => {
                totalStars += repo.stargazers_count;
                totalForks += repo.forks_count;
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });

            // Top repos
            const topRepos = repos
                .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) =>
                    b.stargazers_count - a.stargazers_count
                )
                .slice(0, 6)
                .map((repo: { name: string; description: string; stargazers_count: number; forks_count: number; language: string; html_url: string }) => ({
                    name: repo.name,
                    description: repo.description || '',
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language || 'Unknown',
                    url: repo.html_url,
                }));

            return {
                public_repos: userData.public_repos,
                followers: userData.followers,
                following: userData.following,
                total_stars: totalStars,
                total_forks: totalForks,
                total_commits: 0,
                languages,
                top_repos: topRepos,
            };
        } catch (fetchError) {
            clearTimeout(timeoutId);
            console.info('GitHub fetch failed');
            return null;
        }
    } catch (error) {
        return null;
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
}
