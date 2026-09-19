/**
 * The one-time special offer, shown the moment a term is chosen.
 *
 * Only the YEARLY plan is offered here — the whole screen is a single
 * discounted decision, compared against the standard monthly rate.
 *
 * Every money value is a TOKEN: at runtime these are replaced with the
 * localized App Store price for the user's storefront. The values below are
 * realistic samples so the layout reads correctly in design — never treat
 * them as fixed copy, and never hardcode a currency downstream.
 *
 * OFFER_PERCENT is the saving against twelve months at the standard monthly
 * rate (S$19.98 x 12 = S$239.76 vs S$39.98). The ratio is fixed across
 * storefronts, so the figure is safe to keep static.
 */
export interface OfferPlan {
  id: 'annual';
  /** Duration shown on the plan row, e.g. "12mo". */
  term: string;
  /** {annualPrice} — the billed amount. The visual hero. */
  price: string;
  /** {annualStandard} — struck-through anchor beside the billed amount. */
  standard: string;
}

export const annualOffer: OfferPlan = {
  id: 'annual',
  term: '12mo',
  price: 'S$39.98',
  standard: 'S$49.98'
};

/** Saving vs twelve months at the standard monthly rate. */
export const OFFER_PERCENT = '83%';