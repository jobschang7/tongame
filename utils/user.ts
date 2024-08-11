// utils/user.ts

export function getUserTelegramId(initData: string): string | null {
  try {
    // Decode the URL-encoded string
    const decodedInitData = decodeURIComponent(initData);

    // Parse the query string
    const params = new URLSearchParams(decodedInitData);

    // Get the 'user' parameter and parse it as JSON
    const userString = params.get('user');
    if (!userString) {
      return null;
    }

    const user = JSON.parse(userString);
    return user.id?.toString() || null;
  } catch (error) {
    console.error('Error parsing initData:', error);
    return null;
  }
}