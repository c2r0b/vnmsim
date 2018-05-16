export default class SimService {
  /*@ngInject*/

  constructor($rootScope, $cookies) {
    return $rootScope.sim = {
      status: 0, // 0 = stop, 1 = play, 2 = step, 3 = pause
      step: 0,
      alu: {
        e1: '',
        e2: '',
        op: ''
      },
      acc: 0,
      pc: {
        val: 0,
        step: (+$cookies.get('pc_step') || 1),
      },
      ir: {
        cmd: '',
        loc: ''
      },
      line: '',
      variables: {
        X: '',
        Y: '',
        Z: '',
        W: ''
      },
      tVarCount: (+$cookies.get('tVarCount') || 0),
      focus: {
        el: '',
        var: ''
      }
    }
  }
}
