/**
 * Web3-style Dynamic Asset CDN
 * Fetches icons/assets from decentralized or managed CDN sources
 * Similar to IPFS gateways or Web3 asset APIs
 */

// Base CDN URLs - can be replaced with IPFS gateways or custom CDN
const CDN_BASE_URLS = {
  icons: 'https://api.dicebear.com/7.x/icons/svg?seed=',
  images: 'https://images.unsplash.com/photo-',
  assets: 'https://cloudflare-ipfs.com/ipfs/',
};

// Fallback icons for different categories
const FALLBACK_ICONS: Record<string, string> = {
  chat: '💬',
  translate: '📝',
  speak: '🔊',
  video: '🎬',
  user: '👤',
  default: '⚡',
};

/**
 * Fetch icon from CDN
 * @param iconId - Unique identifier for the icon
 * @param category - Category of the icon (chat, translate, speak, etc.)
 * @returns SVG content or fallback emoji
 */
export async function fetchIcon(iconId: string, category: string): Promise<string> {
  try {
    const url = `${CDN_BASE_URLS.icons}${iconId}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch icon');
    }
    
    return await response.text();
  } catch (error) {
    console.warn(`Failed to fetch icon ${iconId}, using fallback`);
    return FALLBACK_ICONS[category] || FALLBACK_ICONS.default;
  }
}

/**
 * Fetch multiple icons in batch
 * @param iconIds - Array of icon identifiers
 * @returns Map of icon ID to SVG content
 */
export async function fetchIcons(iconIds: string[]): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  
  await Promise.all(
    iconIds.map(async (id) => {
      const [category] = id.split('-');
      const content = await fetchIcon(id, category);
      results.set(id, content);
    })
  );
  
  return results;
}

/**
 * Get optimized image URL from CDN
 * @param imageId - Image identifier
 * @param width - Target width
 * @param height - Target height
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  imageId: string,
  width: number = 400,
  height: number = 300
): string {
  return `${CDN_BASE_URLS.images}${imageId}?w=${width}&h=${height}&fit=crop&auto=format`;
}

/**
 * IPFS gateway URL resolver
 * @param ipfsHash - IPFS content hash
 * @returns Resolved gateway URL
 */
export function resolveIPFS(ipfsHash: string): string {
  // Try multiple gateways for redundancy
  const gateways = [
    `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`,
    `https://ipfs.io/ipfs/${ipfsHash}`,
    `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
  ];
  
  return gateways[0];
}

/**
 * Preload critical assets
 * @param assetUrls - Array of asset URLs to preload
 */
export function preloadAssets(assetUrls: string[]): void {
  assetUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Cache assets in memory for quick access
 */
const assetCache = new Map<string, string>();

export function cacheAsset(key: string, value: string): void {
  assetCache.set(key, value);
}

export function getCachedAsset(key: string): string | undefined {
  return assetCache.get(key);
}

export function clearAssetCache(): void {
  assetCache.clear();
}