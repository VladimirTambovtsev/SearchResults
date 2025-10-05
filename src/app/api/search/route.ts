import { NextRequest, NextResponse } from 'next/server';

// Constants
const MIN_DELAY = 100; // ms
const MAX_DELAY = 800; // ms
const SEARCH_PARAM_KEY = 'q';

// Types
interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
}

interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
  timestamp: string;
}

// Mock data for search results
const mockData: SearchResult[] = [
  { id: 1, title: 'React Hooks Guide', description: 'Learn how to use React hooks effectively in your applications', category: 'React' },
  { id: 2, title: 'TypeScript Best Practices', description: 'Essential TypeScript patterns and practices for modern development', category: 'TypeScript' },
  { id: 3, title: 'Next.js Performance Optimization', description: 'Optimize your Next.js applications for better performance', category: 'Next.js' },
  { id: 4, title: 'CSS Grid Layout', description: 'Master CSS Grid for modern web layouts', category: 'CSS' },
  { id: 5, title: 'JavaScript ES6+ Features', description: 'Explore modern JavaScript features and syntax', category: 'JavaScript' },
  { id: 6, title: 'React State Management', description: 'Different approaches to managing state in React applications', category: 'React' },
  { id: 7, title: 'API Design Patterns', description: 'Best practices for designing RESTful APIs', category: 'Backend' },
  { id: 8, title: 'Responsive Web Design', description: 'Create websites that work on all devices', category: 'CSS' },
  { id: 9, title: 'Node.js Fundamentals', description: 'Get started with server-side JavaScript development', category: 'Node.js' },
  { id: 10, title: 'Database Optimization', description: 'Improve database performance and query efficiency', category: 'Database' },
  { id: 11, title: 'React Testing Library', description: 'Write effective tests for React components', category: 'Testing' },
  { id: 12, title: 'GraphQL Introduction', description: 'Learn GraphQL for efficient data fetching', category: 'GraphQL' },
  { id: 13, title: 'Docker Containerization', description: 'Package applications with Docker containers', category: 'DevOps' },
  { id: 14, title: 'Web Security Basics', description: 'Essential security practices for web applications', category: 'Security' },
  { id: 15, title: 'Progressive Web Apps', description: 'Build PWAs for enhanced user experience', category: 'PWA' },
];

export async function GET(request: NextRequest): Promise<NextResponse<SearchResponse | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get(SEARCH_PARAM_KEY) || '';
    
    // Validate query parameter
    if (typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid query parameter' },
        { status: 400 }
      );
    }
    
    // Simulate realistic network delay
    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Filter results based on query (case-insensitive search)
    const normalizedQuery = query.toLowerCase().trim();
    const filteredResults = mockData.filter(item =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
    
    // Return results with metadata
    const response: SearchResponse = {
      query,
      results: filteredResults,
      total: filteredResults.length,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
