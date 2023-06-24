import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import { AppContainer, ButtonSubmit, Form, FormTitle, ResultContainer, Subtitle, Title } from './App.styles.ts'

import { TextField } from '@nexds/web'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { end, ga, ipl, lc, lg, ls, ml, pct, ra, rpl } from './utils/calculate.ts'
import { error } from 'console'

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

  // const [pct, setPct] = useState<number | null>(null)
  // const [end, setEnd] = useState<number | null>(null)
  // const [ipl, setIpl] = useState<number | null>(null)
  // const [lg, setLg] = useState<number | null>(null)
  // const [lc, setLc] = useState<number | null>(null)
  // const [ls, setLs] = useState<number | null>(null)
  // const [ga, setGa] = useState<number | null>(null)
  // const [ml, setMl] = useState<number | null>(null)
  // const [ra, setRa] = useState<number | null>(null)
  // const [rpl, setRpl] = useState<number | null>(null)
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


  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(zod.object({
      pc: zod.number().min(0),
      pnc: zod.number().min(0),
      pl: zod.number().min(0)
    }))
  })

  function handleCalculatePCT(data: any) {
    const pc = data?.pc
    const pnc = data?.pnc
    const pl = data?.pl

    
    console.log(errors)
    setPCT(pct(pc, pnc, pl).toFixed(2))
  }


  return (
    <AppContainer>
      <Title>Calculadora de índices contábeis</Title>
      <Subtitle>1. ESTRUTURA DE CAPITAL:</Subtitle>
      <FormTitle>Participação de Capital de Terceiros - PCT</FormTitle>
      <Form onSubmit={handleSubmit(handleCalculatePCT)}>
        <TextField
          id="pc"
          label="Passivo Circulante - PC"
          size="sm"
          type="number"
          error={!!errors.pc}
          helpMessage={errors.pc && 'Este campo é obrigatório'}
          {...register('pc', { required: true, valueAsNumber: true })}
        />
        <TextField
          id="pnc"
          label="Passivo Não Circulante - PNC"
          size="sm"
          type="number"
          error={!!errors.pnc}
          helpMessage={errors.pnc && 'Este campo é obrigatório'}
          {...register('pnc', { required: true, valueAsNumber: true })}
        />
        <TextField
          id="pl"
          label="Patrimônio Líquido - PL"
          size="sm"
          type="number"
          error={!!errors.pl}
          helpMessage={errors.pl && 'Este campo é obrigatório'}
          {...register('pl', { required: true, valueAsNumber: true })}
        />
        <ButtonSubmit type="submit">Calcular</ButtonSubmit>
        {PCT &&<ResultContainer>
          <p>PCT: {PCT} %</p>
        </ResultContainer>
        }
      </Form>
    </AppContainer>
  )
}

export default App
