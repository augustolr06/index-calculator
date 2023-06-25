import { useState } from 'react'
import { AppContainer, Button, Form, FormTitle, IndexContainer, IndexItem, ResultContainer, Subtitle, Title, ReportContainer } from './App.styles.ts'

import { IconButton, TextField } from '@nexds/web'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { end, ga, ipl, lc, lg, ls, ml, pct, ra, rpl } from './utils/calculate.ts'

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
 */

function App() {
  const [PCT, setPCT] = useState('')
  const [END, setEND] = useState('')
  const [IPL, setIPL] = useState('')
  const [LG, setLG] = useState('')
  const [LC, setLC] = useState('')
  const [LS, setLS] = useState('')
  const [GA, setGA] = useState('')
  const [ML, setML] = useState('')
  const [RA, setRA] = useState('')
  const [RPL, setRPL] = useState('')

  const [report, setReport] = useState('')

  function handleGenerateReport() {
    if (!PCT && !END && !IPL && !LG && !LC && !LS && !GA && !ML && !RA && !RPL) setReport('Nenhum índice calculado')
    else setReport(`
      Relatório de índices de demonstrativos contábeis\n\n
      Índices de estrutura de capital:\n
      - PCT: ${PCT ? PCT + '%' : 'não calculado'}\n
      - END: ${END ? END + '%' : 'não calculado'}\n
      - IPL: ${IPL ? IPL + '%' : 'não calculado'}\n\n
      Índices de liquidez:\n
      - LG: ${LG ? LG + '%' : 'não calculado'}\n
      - LC: ${LC ? LC + '%' : 'não calculado'}\n
      - LS: ${LS ? LS + '%' : 'não calculado'}\n\n
      Índices de rentabilidade:\n
      - GA: ${GA ? GA + '%' : 'não calculado'}\n
      - ML: ${ML ? ML + '%' : 'não calculado'}\n
      - RA: ${RA ? RA + '%' : 'não calculado'}\n
      - RPL: ${RPL ? RPL + '%' : 'não calculado'}\n
    `)
  }

  function handleClearAllResults() {
    setPCT('')
    setEND('')
    setIPL('')
    setLG('')
    setLC('')
    setLS('')
    setGA('')
    setML('')
    setRA('')
    setRPL('')
    setReport('')
  }


  const { register: registerPCT, handleSubmit: handleSubmitPCT, watch: watchPCT, formState: { errors: errorsPCT } } = useForm({
    resolver: zodResolver(zod.object({
      pc: zod.number().positive(),
      pnc: zod.number().positive(),
      pl: zod.number().positive(),
    }))
  })

  const { register: registerEND, handleSubmit: handleSubmitEND, watch: watchEND, formState: { errors: errorsEND } } = useForm({
    resolver: zodResolver(zod.object({
      pc: zod.number().positive(),
      pnc: zod.number().positive(),
    }))
  })

  const { register: registerIPL, handleSubmit: handleSubmitIPL, watch: watchIPL, formState: { errors: errorsIPL } } = useForm({
    resolver: zodResolver(zod.object({
      imobil: zod.number().positive(),
      pl: zod.number().positive(),
    }))
  })

  const { register: registerLG, handleSubmit: handleSubmitLG, watch: watchLG, formState: { errors: errorsLG } } = useForm({
    resolver: zodResolver(zod.object({
      ac: zod.number().positive(),
      rlp: zod.number().positive(),
      pc: zod.number().positive(),
      pnc: zod.number().positive(),
    }))
  })

  const { register: registerLC, handleSubmit: handleSubmitLC, watch: watchLC, formState: { errors: errorsLC } } = useForm({
    resolver: zodResolver(zod.object({
      ac: zod.number().positive(),
      pc: zod.number().positive(),
    }))
  })

  const { register: registerLS, handleSubmit: handleSubmitLS, watch: watchLS, formState: { errors: errorsLS } } = useForm({
    resolver: zodResolver(zod.object({
      ac: zod.number().positive(),
      est: zod.number().positive(),
      pc: zod.number().positive(),
    }))
  })

  const { register: registerGA, handleSubmit: handleSubmitGA, watch: watchGA, formState: { errors: errorsGA } } = useForm({
    resolver: zodResolver(zod.object({
      vl: zod.number().positive(),
      at: zod.number().positive(),
    }))
  })

  const { register: registerML, handleSubmit: handleSubmitML, watch: watchML, formState: { errors: errorsML } } = useForm({
    resolver: zodResolver(zod.object({
      ll: zod.number().positive(),
      vl: zod.number().positive(),
    }))
  })

  const { register: registerRA, handleSubmit: handleSubmitRA, watch: watchRA, formState: { errors: errorsRA } } = useForm({
    resolver: zodResolver(zod.object({
      ll: zod.number().positive(),
      at: zod.number().positive(),
    }))
  })

  const { register: registerRPL, handleSubmit: handleSubmitRPL, watch: watchRPL, formState: { errors: errorsRPL } } = useForm({
    resolver: zodResolver(zod.object({
      ll: zod.number().positive(),
      plm: zod.number().positive(),
    }))
  })

  function handleCalculatePCT(data: any) {
    const pc = data?.pc
    const pnc = data?.pnc
    const pl = data?.pl

    setPCT(pct(pc, pnc, pl).toFixed(2))
  }

  function handleCalculateEND(data: any) {
    const pc = data?.pc
    const pnc = data?.pnc

    setEND(end(pc, pnc).toFixed(2))
  }

  function handleCalculateIPL(data: any) {
    const imobil = data?.imobil
    const pl = data?.pl

    setIPL(ipl(imobil, pl).toFixed(2))
  }

  function handleCalculateLG(data: any) {
    const ac = data?.ac
    const rlp = data?.rlp
    const pc = data?.pc
    const pnc = data?.pnc

    setLG(lg(ac, rlp, pc, pnc).toFixed(2))
  }

  function handleCalculateLC(data: any) {
    const ac = data?.ac
    const pc = data?.pc

    setLC(lc(ac, pc).toFixed(2))
  }

  function handleCalculateLS(data: any) {
    const ac = data?.ac
    const est = data?.est
    const pc = data?.pc

    setLS(ls(ac, est, pc).toFixed(2))
  }

  function handleCalculateGA(data: any) {
    const vl = data?.vl
    const at = data?.at

    setGA(ga(vl, at).toFixed(2))
  }

  function handleCalculateML(data: any) {
    const ll = data?.ll
    const vl = data?.vl

    setML(ml(ll, vl).toFixed(2))
  }

  function handleCalculateRA(data: any) {
    const ll = data?.ll
    const at = data?.at
    
    setRA(ra(ll, at).toFixed(2))
  }

  function handleCalculateRPL(data: any) {
    const ll = data?.ll
    const plm = data?.plm

    setRPL(rpl(ll, plm).toFixed(2))
  }



  return (
    <AppContainer>
      <Title>Calculadora de índices contábeis</Title>
      <IndexContainer>
        <Subtitle>1. ESTRUTURA DE CAPITAL:</Subtitle>
        <IndexItem>
          <FormTitle>Participação de Capital de Terceiros - PCT</FormTitle>
          <Form onSubmit={handleSubmitPCT(handleCalculatePCT)}>
            <TextField
              id="pc"
              label="Passivo Circulante"
              size="sm"
              type="number"
              error={!!errorsPCT.pc}
              helpMessage={errorsPCT.pc && 'Este campo é obrigatório'}
              {...registerPCT('pc', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pnc"
              label="Passivo Não Circulante"
              size="sm"
              type="number"
              error={!!errorsPCT.pnc}
              helpMessage={errorsPCT.pnc && 'Este campo é obrigatório'}
              {...registerPCT('pnc', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pl"
              label="Patrimônio Líquido"
              size="sm"
              type="number"
              error={!!errorsPCT.pl}
              helpMessage={errorsPCT.pl && 'Este campo é obrigatório'}
              {...registerPCT('pl', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
            <ResultContainer>
              {PCT && <p>PCT: {PCT} %</p>}
            </ResultContainer>
            {PCT && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setPCT('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Composição do Endividamento - END</FormTitle>
          <Form onSubmit={handleSubmitEND(handleCalculateEND)}>
            <TextField
              id="pc"
              label="Passivo Circulante"
              size="sm"
              type="number"
              error={!!errorsEND.pc}
              helpMessage={errorsEND.pc && 'Este campo é obrigatório'}
              {...registerEND('pc', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pnc"
              label="Passivo Não Circulante"
              size="sm"
              type="number"
              error={!!errorsEND.pnc}
              helpMessage={errorsEND.pnc && 'Este campo é obrigatório'}
              {...registerEND('pnc', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
            <ResultContainer>
              {END && <p>END: {END} %</p>}
            </ResultContainer>
            {END && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setEND('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Imobilização do Patrimônio Líquido - IPL</FormTitle>
          <Form onSubmit={handleSubmitIPL(handleCalculateIPL)}>
            <TextField
              id="imobil"
              label="Imobilizado"
              size="sm"
              type="number"
              error={!!errorsIPL.imobil}
              helpMessage={errorsIPL.imobil && 'Este campo é obrigatório'}
              {...registerIPL('imobil', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pl"
              label="Patrimônio Líquido"
              size="sm"
              type="number"
              error={!!errorsIPL.pl}
              helpMessage={errorsIPL.pl && 'Este campo é obrigatório'}
              {...registerIPL('pl', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
            <ResultContainer>
              {IPL && <p>IPL: {IPL} %</p>}
            </ResultContainer>
            {IPL && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setIPL('')}
              />}
          </Form>
        </IndexItem>
      </IndexContainer>
      <IndexContainer>
        <Subtitle>2. LIQUIDEZ:</Subtitle>
        <IndexItem>
          <FormTitle>Liquidez Geral - LG</FormTitle>
          <Form onSubmit={handleSubmitLG(handleCalculateLG)}>
            <TextField
              id="ac"
              label="Ativo Circulante"
              size="sm"
              type="number"
              error={!!errorsLG.ac}
              helpMessage={errorsLG.ac && 'Este campo é obrigatório'}
              {...registerLG('ac', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="rlp"
              label="Realizável a Longo Prazo"
              size="sm"
              type="number"
              error={!!errorsLG.rlp}
              helpMessage={errorsLG.rlp && 'Este campo é obrigatório'}
              {...registerLG('rlp', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pc"
              label="Passivo Circulante"
              size="sm"
              type="number"
              error={!!errorsLG.pc}
              helpMessage={errorsLG.pc && 'Este campo é obrigatório'}
              {...registerLG('pc', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pnc"
              label="Passivo Não Circulante"
              size="sm"
              type="number"
              error={!!errorsLG.pnc}
              helpMessage={errorsLG.pnc && 'Este campo é obrigatório'}
              {...registerLG('pnc', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {LG && <p>LG: {LG}</p>}
            </ResultContainer>
            {LG && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setLG('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Liquidez Corrente - LC</FormTitle>
          <Form onSubmit={handleSubmitLC(handleCalculateLC)}>
            <TextField
              id="ac"
              label="Ativo Circulante"
              size="sm"
              type="number"
              error={!!errorsLC.ac}
              helpMessage={errorsLC.ac && 'Este campo é obrigatório'}
              {...registerLC('ac', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pc"
              label="Passivo Circulante"
              size="sm"
              type="number"
              error={!!errorsLC.pc}
              helpMessage={errorsLC.pc && 'Este campo é obrigatório'}
              {...registerLC('pc', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {LC && <p>LC: {LC}</p>}
            </ResultContainer>
            {LC && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setLC('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Liquidez Seca - LS</FormTitle>
          <Form onSubmit={handleSubmitLS(handleCalculateLS)}>
            <TextField
              id="ac"
              label="Ativo Circulante"
              size="sm"
              type="number"
              error={!!errorsLS.ac}
              helpMessage={errorsLS.ac && 'Este campo é obrigatório'}
              {...registerLS('ac', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="est"
              label="Estoque"
              size="sm"
              type="number"
              error={!!errorsLS.est}
              helpMessage={errorsLS.est && 'Este campo é obrigatório'}
              {...registerLS('est', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="pc"
              label="Passivo Circulante"
              size="sm"
              type="number"
              error={!!errorsLS.pc}
              helpMessage={errorsLS.pc && 'Este campo é obrigatório'}
              {...registerLS('pc', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {LS && <p>LS: {LS}</p>}
            </ResultContainer>
            {LS && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setLS('')}
              />}
          </Form>
        </IndexItem>
      </IndexContainer>
      <IndexContainer>
        <Subtitle>3. RENTABILIDADE:</Subtitle>
        <IndexItem>
          <FormTitle>Giro do Ativo - GA</FormTitle>
          <Form onSubmit={handleSubmitGA(handleCalculateGA)}>
            <TextField
              id="vl"
              label="Vendas Líquidas"
              size="sm"
              type="number"
              error={!!errorsGA.vl}
              helpMessage={errorsGA.vl && 'Este campo é obrigatório'}
              {...registerGA('vl', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="at"
              label="Ativo Total"
              size="sm"
              type="number"
              error={!!errorsGA.at}
              helpMessage={errorsGA.at && 'Este campo é obrigatório'}
              {...registerGA('at', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {GA && <p>GA: {GA} %</p>}
            </ResultContainer>
            {GA && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setGA('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Margem Líquida - ML</FormTitle>
          <Form onSubmit={handleSubmitML(handleCalculateML)}>
            <TextField
              id="ll"
              label="Lucro Líquido"
              size="sm"
              type="number"
              error={!!errorsML.ll}
              helpMessage={errorsML.ll && 'Este campo é obrigatório'}
              {...registerML('ll', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="vl"
              label="Vendas Líquidas"
              size="sm"
              type="number"
              error={!!errorsML.vl}
              helpMessage={errorsML.vl && 'Este campo é obrigatório'}
              {...registerML('vl', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {ML && <p>ML: {ML} %</p>}
            </ResultContainer>
            {ML && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setML('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Rentabilidade do Ativo - RA</FormTitle>
          <Form onSubmit={handleSubmitRA(handleCalculateRA)}>
            <TextField
              id="ll"
              label="Lucro Líquido"
              size="sm"
              type="number"
              error={!!errorsRA.ll}
              helpMessage={errorsRA.ll && 'Este campo é obrigatório'}
              {...registerRA('ll', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="at"
              label="Ativo Total"
              size="sm"
              type="number"
              error={!!errorsRA.at}
              helpMessage={errorsRA.at && 'Este campo é obrigatório'}
              {...registerRA('at', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
          <ResultContainer>
              {RA && <p>RA: {RA} %</p>}
            </ResultContainer>
            {RA && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setRA('')}
              />}
          </Form>
        </IndexItem>
        <IndexItem>
          <FormTitle>Rentabilidade do Patrimônio Líquido - RPL</FormTitle>
          <Form onSubmit={handleSubmitRPL(handleCalculateRPL)}>
            <TextField
              id="ll"
              label="Lucro Líquido"
              size="sm"
              type="number"
              error={!!errorsRPL.ll}
              helpMessage={errorsRPL.ll && 'Este campo é obrigatório'}
              {...registerRPL('ll', { required: true, valueAsNumber: true })}
            />
            <TextField
              id="plm"
              label="Patrimônio Líquido Médio"
              size="sm"
              type="number"
              error={!!errorsRPL.plm}
              helpMessage={errorsRPL.plm && 'Este campo é obrigatório'}
              {...registerRPL('plm', { required: true, valueAsNumber: true })}
            />
            <Button type="submit">Calcular</Button>
            <ResultContainer>
              {RPL && <p>RPL: {RPL} %</p>}
            </ResultContainer>
            {RPL && <IconButton
              icon='Trash'
              radius='square'
              color='ghost'
              onClick={() => setRPL('')}
              />}
          </Form>
        </IndexItem>
      </IndexContainer>
      <Button
        color='#6c7e86'
        onClick={handleClearAllResults}
        style={{
          alignSelf: 'center',
          marginBottom: '20px'
          }}
      >
        Limpar todos os resultados
      </Button>
      <Button
        onClick={handleGenerateReport}
      >
        {report ? 'Atualizar relatório' : 'Gerar relatório'}
      </Button>
      <ReportContainer>
        {report && (
          report.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))
        )}
      </ReportContainer>
    </AppContainer>
  )
}

export default App
