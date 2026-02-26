export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration: number;
  isShort: boolean;
  videoId: string;
}

export interface YouTubePlaylistItemResponse {
  items: {
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
      resourceId: {
        videoId: string;
      };
    };
  }[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeVideoDetailResponse {
  items: {
    id: string;
    contentDetails: {
      duration: string;
    };
    snippet: {
      tags?: string[];
    };
  }[];
}

export interface SermonsApiResponse {
  videos: YouTubeVideo[];
  cached: boolean;
}
