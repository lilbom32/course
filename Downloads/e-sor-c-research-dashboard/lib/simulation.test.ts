import { describe, it, expect } from 'vitest';
import { calculateSimulation, SCENARIOS } from './simulation';
import type { SimState } from './simulation';

describe('E-SOR-C Scientific Simulation Model', () => {

    // H1: Construct Validity - The model must behave as documented
    describe('Construct Validity', () => {

        it('Response probabilities must always sum to 100% (Normalization Check)', () => {
            // Test across all predefined scenarios
            Object.values(SCENARIOS).forEach((state) => {
                const result = calculateSimulation(state);
                const sum = result.rBuy + result.rNoBuy + result.rUndecided;
                expect(sum).toBe(100);
            });

            // Test random edge cases
            const randomState: SimState = { ...SCENARIOS.ideal, sCu: 0, sSo: 0, sPr: 0, sPl: 0, sPx: 0, oAt: 0 };
            const result = calculateSimulation(randomState);
            expect(result.rBuy + result.rNoBuy + result.rUndecided).toBe(100);
        });

        it('H5 (Moderator): Attitude < 40 must block purchase (Gate Closed)', () => {
            // Create a scenario where the CALCULATED Attitude falls below 40.
            // Attitude = oAt*0.5 + sPx*0.25 + sPr*0.1 + sPro*0.15
            // We need low values across all attitude inputs to ensure the gate closes.
            const state: SimState = {
                ...SCENARIOS.ideal,
                sCu: 100, // Even with Max Cultural Story (Stimulus)
                oAt: 30,  // Low initial trust
                sPx: 40,  // Low price transparency
                sPr: 40,  // Low product quality
                sPro: 0   // No storytelling/promotion — must override ideal's sPro:90
            };

            // Expected Attitude = 30*0.5 (15) + 40*0.25 (10) + 40*0.1 (4) + 0*0.15 (0) = 29
            // 29 < 40, so the Gate should trigger the +60 NoBuy penalty

            const result = calculateSimulation(state);

            expect(result.attitude).toBe(29);
            expect(result.gate).toBeCloseTo(0.29, 5);
            expect(result.rNoBuy).toBeGreaterThan(result.rBuy);
            expect(result.rNoBuy).toBeGreaterThan(50); // Should be very high probability of NoBuy due to penalty
        });

        it('H6 & H7: Tour Context amplifies Social Influence', () => {
            // Comparison: Same Social Score (80), different Context
            const soloState: SimState = { ...SCENARIOS.ideal, sSo: 80, ctx: 10 }; // Solo
            const tourState: SimState = { ...SCENARIOS.ideal, sSo: 80, ctx: 90 }; // Tour

            const soloResult = calculateSimulation(soloState);
            const tourResult = calculateSimulation(tourState);

            // Arousal should be higher in tour due to social amplification
            expect(tourResult.arousal).toBeGreaterThan(soloResult.arousal);

            // Verify specific multiplier logic: Tour (0.45) vs Solo (0.2) weight
            // If sSo accounts for 0.25 difference in weight * 80 score = 20 points difference in raw simulation (roughly)
            expect(tourResult.arousal - soloResult.arousal).toBeGreaterThan(5);
        });
    });

    // H2: Reliability - Consistent inputs yield consistent outputs
    describe('Reliability', () => {
        it('Ideal Scenario yields predictive success', () => {
            const result = calculateSimulation(SCENARIOS.ideal);
            expect(result.rBuy).toBeGreaterThan(80);
            expect(result.rNoBuy).toBeLessThan(5);
        });

        it('China Scenario yields rejection', () => {
            const result = calculateSimulation(SCENARIOS.madeChina);
            expect(result.rNoBuy).toBeGreaterThan(50);
            expect(result.rBuy).toBeLessThan(20);
        });
    });

});
