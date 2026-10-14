/** Critically damped UI spring. Maps to Apple damping 1.0, response ~0.4s. */
export const settle = { type: 'spring' as const, bounce: 0, duration: 0.4 };

/** Slightly slower settle for panels that travel a short distance. */
export const settlePanel = { type: 'spring' as const, bounce: 0, duration: 0.45 };
