import { Status } from '@/utils/types';
import { Analyte, DiagnosticTest } from '..';
import {
  ANALYTE_LIMITS_MAPPING,
  ANALYTE_TO_UNIT_MAPPING,
  ANALYTES_LIST,
} from './constants';

type GridTest = {
  name: Analyte;
  value: number | boolean;
  unit: string;
  status: Status;
  history: number[];
};

function _getAnalyteStatus(
  analyteName: Analyte,
  analyteValue: number | boolean,
): Status {
  if (typeof analyteValue === 'boolean') return 'normal';
  const { low, high } = ANALYTE_LIMITS_MAPPING[analyteName];

  if (analyteValue < low) return 'low';
  if (analyteValue > high) return 'high';
  return 'normal';
}

function _getAnalyteHistory(
  analyteName: Analyte,
  tests: DiagnosticTest[],
): number[] {
  return tests
    .filter(
      (test) => test[analyteName] !== undefined && test[analyteName] !== null,
    )
    .sort((a, b) => +a.test_date - +b.test_date)
    .map((test) => Number(test[analyteName]));
}

export function getLatestTestsToGrid(tests: DiagnosticTest[]): GridTest[] {
  const gridTests: GridTest[] = [];
  if (tests.length === 0) return gridTests;

  const latestTest = tests.sort((a, b) => +b.test_date - +a.test_date)[0];

  for (const analyteName of ANALYTES_LIST) {
    const analyteValue = latestTest[analyteName];
    if (analyteValue === null || analyteValue === undefined) continue;

    gridTests.push({
      name: analyteName,
      value: analyteValue,
      unit: ANALYTE_TO_UNIT_MAPPING(analyteName, analyteValue),
      status: _getAnalyteStatus(analyteName, analyteValue),
      history: _getAnalyteHistory(analyteName, tests),
    });
  }
  return gridTests;
}
