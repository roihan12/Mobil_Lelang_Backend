export type PagedResult<T> = {
  results: T[];
  pageCount: number;
  totalCount: number;
};

export type Auction = {
  reservePrice: number;
  seller: string;
  winner?: string;
  soldAmount?: number;
  currentHighBid?: number;
  createdAt: string;
  updatedAt: string;
  endedAt: string;
  status: string;
  make: string;
  model: string;
  year: number;
  color: string;
  milage: number;
  imageUrl: string;
  id: string;
};

export type Bid = {
  id: string;
  lelangId: string;
  bidder: string;
  bidTime: string;
  amount: number;
  bidStatus: string;
};

export type AuctionFinished = {
  itemSold: boolean;
  lelangId: string;
  winner?: string;
  seller: string;
  amount?: number;
};
