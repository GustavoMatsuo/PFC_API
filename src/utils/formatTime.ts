import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export function fDateSimple(date:Date) {
  return format(new Date(date), 'yyyy-MM-dd', { locale: ptBR })
}

export function fDateMonthYear(date:Date) {
  return format(new Date(date), 'yyyy-MM', { locale: ptBR })
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: ptBR })
}