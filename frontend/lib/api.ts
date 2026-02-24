
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchAPI<T>(query: string, offset: number): Promise<T> {
    const querySafe = encodeURIComponent(query)
    
    const response = await fetch(`${BASE_URL}/search?q=${querySafe}&sroffset=${offset}`, {
        cache: 'no-store'
    })
    if (!response.ok) {
        throw new Error(`Error API: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
