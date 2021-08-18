import Domain from '@/modules/domain/type/Domain';
import DomainTreeNode from '@/modules/domain/type/DomainTreeNode';
import { DomainState } from './domain.state';

export default {
  setDomainsTrees (state: DomainState, tree: DomainTreeNode) {
    state.domainsTree = tree;
  },
  setCurrentDomain (state: DomainState, domain: Domain) {
    state.currentDomain = domain;
  }
};
