/**
 * - este app é uma calculadora de índices de demonstrativos contábeis.
 * - o objetivo é calcular os índices de estrutura de capital, liquidez e rentabilidade.
 * - para calcular:
 * 1. estrutura de capital:
 * 1.1. PCT - participação de capital de terceiros: PCT = (PC + PNC) / PL
 * 1.2. END - composição do endividamento: END = PC / (PC + PNC)
 * 1.3. IPL - imobilização do patrimônio líquido: IPL = Imobil. / PL
 * 2. liquidez:
 * 2.1. LG - liquidez geral: LG = (AC + RLP) / (PC + PNC)
 * 2.2. LC - liquidez corrente: LC = AC / PC
 * 2.3. LS - liquidez seca: LS = (AC - EST) / PC
 * 3. rentabilidade:
 * 3.1. GA - giro do ativo: GA = Vendas líquidas / Ativo total
 * 3.2. ML - margem líquida: ML = Lucro líquido / Vendas líquidas
 * 3.3. RA - rentabilidade do ativo: RA = lucro líquido / ativo total
 * 3.4. RPL - rentabilidade do patrimônio líquido: RPL = lucro líquido / patrimônio líquido médio
 * - cada cálculo deve ser feito em uma função separada.
 * - cada função deve receber os parâmetros necessários para o cálculo.
 * - cada função deve retornar o resultado do cálculo.
 * - o resultado deve ser exibido no console.
 */

/** 1. estrutura de capital:
 * 1.1. PCT - participação de capital de terceiros: PCT = (PC + PNC) / PL
 */
export function pct(pc: number, pnc: number, pl: number): number {
  return ((pc + pnc) / pl) * 100 || 0;
}

/** 1. estrutura de capital:
 * 1.2. END - composição do endividamento: END = PC / (PC + PNC)
 */
export function end(pc: number, pnc: number): number {
  return (pc / (pc + pnc)) * 100 || 0;
}

/** 1. estrutura de capital:
 * 1.3. IPL - imobilização do patrimônio líquido: IPL = Imobil. / PL
 */
export function ipl(imobil: number, pl: number): number {
  return (imobil / pl) * 100 || 0;
}

/** 2. liquidez:
 * 2.1. LG - liquidez geral: LG = (AC + RLP) / (PC + PNC)
 */
export function lg(ac: number, rlp: number, pc: number, pnc: number): number {
  return (ac + rlp) / (pc + pnc) || 0;
}

/** 2. liquidez:
 * 2.2. LC - liquidez corrente: LC = AC / PC
 */
export function lc(ac: number, pc: number): number {
  return ac / pc || 0;
}

/** 2. liquidez:
 * 2.3. LS - liquidez seca: LS = (AC - EST) / PC
 */
export function ls(ac: number, est: number, pc: number): number {
  return (ac - est) / pc || 0;
}

/** 3. rentabilidade:
 * 3.1. GA - giro do ativo: GA = Vendas líquidas / Ativo total
 */
export function ga(vl: number, at: number): number {
  return (vl / at) * 100 || 0;
}

/** 3. rentabilidade:
 * 3.2. ML - margem líquida: ML = Lucro líquido / Vendas líquidas
 */
export function ml(ll: number, vl: number): number {
  return (ll / vl) * 100 || 0;
}

/** 3. rentabilidade:
 * 3.3. RA - rentabilidade do ativo: RA = lucro líquido / ativo total
 */
export function ra(ll: number, at: number): number {
  return (ll / at) * 100 || 0;
}

/** 3. rentabilidade:
 * 3.4. RPL - rentabilidade do patrimônio líquido: RPL = lucro líquido / patrimônio líquido médio
 */
export function rpl(ll: number, plm: number): number {
  return (ll / plm) * 100 || 0;
}
