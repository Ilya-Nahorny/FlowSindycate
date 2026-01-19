/**
 * Типы и интерфейсы для приложения Flow Syndicate
 */

/**
 * Роли пользователей
 */
export enum UserRole {
  USER = 'user',      // Родитель
  ADMIN = 'admin'     // Администратор
}

/**
 * Типы занятий
 */
export enum ClassType {
  SINGLE = 'single',              // Разовое занятие
  SUBSCRIPTION_WEEKLY = 'subscription_weekly',  // Абонемент 1 раз в неделю
  SUBSCRIPTION_BIWEEKLY = 'subscription_biweekly', // Абонемент 2 раза в неделю
  INDIVIDUAL = 'individual'       // Индивидуальная тренировка
}

/**
 * Статус занятия
 */
export enum ClassStatus {
  PLANNED = 'planned',      // Запланировано
  ATTENDED = 'attended',    // Посещено
  MISSED = 'missed',        // Пропущено
  CANCELLED = 'cancelled'   // Отменено
}

/**
 * Статус оплаты
 */
export enum PaymentStatus {
  PENDING = 'pending',      // Ожидает оплаты
  PAID = 'paid',            // Оплачено
  FAILED = 'failed',        // Ошибка оплаты
  REFUNDED = 'refunded'     // Возврат
}

/**
 * Способ оплаты
 */
export enum PaymentMethod {
  BLIK = 'blik',
  PRZELEWY24 = 'przelewy24',
  OTHER = 'other'
}

/**
 * Дни недели
 */
export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

/**
 * Пользователь (родитель)
 */
export interface User {
  id: string
  email: string
  phone: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

/**
 * Участник занятий (ребенок)
 */
export interface Child {
  id: string
  userId: string
  firstName: string
  lastName: string
  birthYear: number
  createdAt: string
  updatedAt: string
}

/**
 * Группа занятий
 */
export interface Group {
  id: string
  name: string
  description?: string
  maxParticipants?: number
  createdAt: string
  updatedAt: string
}

/**
 * Занятие в расписании
 */
export interface ScheduleClass {
  id: string
  groupId: string
  group?: Group
  dayOfWeek: WeekDay
  startTime: string  // Формат: "HH:mm"
  endTime: string    // Формат: "HH:mm"
  trainerId?: string
  trainerName?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Запись на занятие
 */
export interface ClassBooking {
  id: string
  childId: string
  child?: Child
  scheduleClassId: string
  scheduleClass?: ScheduleClass
  classType: ClassType
  status: ClassStatus
  date: string  // Дата занятия (ISO string)
  createdAt: string
  updatedAt: string
}

/**
 * Посещение занятия
 */
export interface Attendance {
  id: string
  bookingId: string
  booking?: ClassBooking
  childId: string
  child?: Child
  scheduleClassId: string
  scheduleClass?: ScheduleClass
  date: string
  attended: boolean
  notes?: string
  markedBy?: string  // ID администратора
  createdAt: string
  updatedAt: string
}

/**
 * Платеж
 */
export interface Payment {
  id: string
  userId: string
  user?: User
  amount: number  // В PLN
  currency: string  // "PLN"
  status: PaymentStatus
  method?: PaymentMethod
  description?: string
  bookings?: ClassBooking[]  // Связанные записи
  transactionId?: string
  paidAt?: string
  createdAt: string
  updatedAt: string
}

/**
 * Цены на занятия
 */
export interface Pricing {
  single: number           // 70 PLN
  subscriptionWeekly: number  // 250 PLN
  subscriptionBiweekly: number // 380 PLN
  individualMin: number    // 120 PLN
}

/**
 * Данные для регистрации
 */
export interface RegisterData {
  email: string
  phone: string
  password?: string  // Опционально, если используется внешняя аутентификация
}

/**
 * Данные для входа
 */
export interface LoginData {
  email: string
  password?: string
}

/**
 * Данные для добавления ребенка
 */
export interface AddChildData {
  firstName: string
  lastName: string
  birthDate: string  // Полная дата рождения (ISO string)
  phone: string      // Номер телефона для контакта
}

/**
 * Данные для записи на занятие
 */
export interface BookClassData {
  childId: string
  scheduleClassId: string
  classType: ClassType
  date: string
}

/**
 * Данные для создания расписания (админ)
 */
export interface CreateScheduleData {
  groupId: string
  dayOfWeek: WeekDay
  startTime: string
  endTime: string
  trainerId?: string
  trainerName?: string
}

/**
 * Финансовая статистика (админ)
 */
export interface FinancialStats {
  totalRevenue: number
  pendingPayments: number
  revenueByClass: Record<string, number>
  revenueByGroup: Record<string, number>
  revenueByUser: Record<string, number>
  period: {
    start: string
    end: string
  }
}

/**
 * Статистика посещаемости (админ)
 */
export interface AttendanceStats {
  totalBookings: number
  attended: number
  missed: number
  attendanceRate: number  // Процент посещаемости
  byGroup: Record<string, {
    total: number
    attended: number
    rate: number
  }>
  byChild: Record<string, {
    total: number
    attended: number
    rate: number
  }>
}
