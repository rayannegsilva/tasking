import { Card, Checkitems, Checklist, List } from '@prisma/client'

export type ListWithCards = List & { cards: Card[]}

export type CardWithList = Card & { list: List, checklist: ChecklistWithItems[] }

export type ChecklistWithItems = Checklist & {checkitems: Checkitems[]}
