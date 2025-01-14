import { ActionTree } from 'vuex';
import { DomainState } from './domain.state';
import RootState from '@/core/types/RootState';
import Status from '@/core/types/Status';
import Domain from '@/modules/domain/types/Domain';
import {
  getDomains,
  getDomain,
  updateDomain,
  deleteDomain,
  getFunctionalties
} from '@/modules/domain/services/domain-api';
import User from '@/modules/user/types/User';

const actions: ActionTree<DomainState, RootState> = {
  async fetchDomainsTree ({ commit }) {
    const domains = await getDomains({ params: { tree: true } });

    commit('setDomainsTree', domains[0]);
  },
  async fetchDomainById ({ commit }, id: string) {
    commit('setCurrentDomainStatus', Status.LOADING);

    try {
      const domain = await getDomain(id, { params: { detail: true } });

      commit('setCurrentDomain', domain);
      commit('setCurrentDomainStatus', Status.SUCCESS);
    } catch (error) {
      commit('setCurrentDomainStatus', Status.ERROR);
    }
  },
  async updateDomain ({ commit }, domain: Domain) {
    const updated = await updateDomain(domain);

    commit('setCurrentDomain', updated);
    commit('setDomainNameInTree', updated);
  },
  async deleteCurrentDomain ({ state, dispatch }) {
    await deleteDomain(state.currentDomain);
    await dispatch('fetchDomainsTree');
    await dispatch('fetchDomainById', state.domainsTree.uuid);
  },
  async fetchLoggedUserFunctionalities ({ commit, rootGetters }) {
    const loggedUser: User = rootGetters['Auth/getLoggedUser'];

    if (!loggedUser) return;

    const functionalities = await getFunctionalties(loggedUser.domain.uuid, { includeSubs: true });

    commit('setLoggedUserFunctionalities', functionalities);
  }
};

export default actions;
