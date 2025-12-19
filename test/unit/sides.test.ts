import { strict, test } from 'poku';
import { getSideLabel } from '../../src/helpers/get-side-label';

test("Side label's generation", () => {
  strict.equal(getSideLabel(0), 'A', 'should return A for index 0');
  strict.equal(getSideLabel(1), 'B', 'should return B for index 1');
  strict.equal(getSideLabel(2), 'C', 'should return C for index 2');
  strict.equal(getSideLabel(3), 'D', 'should return D for index 3');
  strict.equal(getSideLabel(4), 'E', 'should return E for index 4');
  strict.equal(getSideLabel(5), 'F', 'should return F for index 5');
  strict.equal(getSideLabel(6), 'G', 'should return G for index 6');
  strict.equal(getSideLabel(7), 'H', 'should return H for index 7');
  strict.equal(getSideLabel(8), 'I', 'should return I for index 8');
  strict.equal(getSideLabel(9), 'J', 'should return J for index 9');
  strict.equal(getSideLabel(10), 'K', 'should return K for index 10');
  strict.equal(getSideLabel(26), 'AA', 'should return AA for index 26');
});
