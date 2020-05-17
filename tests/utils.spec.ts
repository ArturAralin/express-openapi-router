import {
  replacePathVariables,
} from '../src/utils';
import * as chai from 'chai';
import 'mocha';

describe('Utils', () => {
  it('should replace {tag} to :tag', () => {
    const path = replacePathVariables('/a/{b}/c/d/{e}/{f}');

    chai.expect(path).to.equals('/a/:b/c/d/:e/:f')
  });
});
