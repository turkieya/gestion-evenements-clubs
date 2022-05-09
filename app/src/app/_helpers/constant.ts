export const TableRowsLimit = 10;

export const DefaultProfilePicture = 'assets/images/default.png';

export enum SupportedLanguages {
  FR = 'fr',
  EN = 'en',
}

export enum GendersEnum {
  Male = 'M',
  Female = 'F',
}

export const GenderOptions = [
  {label: GendersEnum.Male, value: GendersEnum.Male},
  {label: GendersEnum.Female, value: GendersEnum.Female},
];

export enum ModuleTypesEnum {
  COMMON = 'common',
  HR = 'human_resources',
}

export enum MaritalStatusEnum {
  Unknown = 'unknown',
  Married = 'married',
  Widowed = 'widowed',
  Divorced = 'divorced',
  Single = 'single',
}

export const MaritalStatusOptions = [
  {label: MaritalStatusEnum.Unknown, value: MaritalStatusEnum.Unknown},
  {label: MaritalStatusEnum.Single, value: MaritalStatusEnum.Single},
  {label: MaritalStatusEnum.Married, value: MaritalStatusEnum.Married},
  {label: MaritalStatusEnum.Widowed, value: MaritalStatusEnum.Widowed},
  {label: MaritalStatusEnum.Divorced, value: MaritalStatusEnum.Divorced},
];

export enum BonusTypesEnum {
  Value = 'value',
  Percentage = 'percentage',
}

export const BonusTypesOptions = [
  {label: BonusTypesEnum.Value, value: BonusTypesEnum.Value},
  {label: BonusTypesEnum.Percentage, value: BonusTypesEnum.Percentage},
];

export enum RequestLeaveStatusEnum {
  PENDING = 'pending',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

export enum RequestLeaveNatureEnum {
  ANNUAL = 'annual',
  RECOVERY = 'recovery',
  PAID_LEAVES = 'paid_leave',
  RTT = 'rtt',
  OTHER = 'other',
}

export enum ModuleActionsTypesEnum {
  CREATE = 'create',
  LIST = 'list',
  UPDATE = 'update',
  DELETE = 'delete',

  LIST_MODULES = 'list_modules',
  MANAGE_MODULES = 'manage_modules',

  CREATE_ROLE = 'create_role',
  LIST_ROLES = 'list_roles',
  DELETE_ROLES = 'delete_roles',
  UPDATE_ROLES = 'update_roles',
  MANAGE_ROLES = 'manage_roles',

  CREATE_LEAVE = 'create_leave_request',
  VALIDATE_ALL_LEAVES = 'validate_all_leave_requests',
  VALIDATE_MY_LEAVES = 'validate_my_leave_requests',
  LIST_ALL_LEAVES = 'list_all_leave_requests',
  LIST_MY_LEAVES = 'list_my_leave_requests',
  UPDATE_ALL_LEAVES = 'update_all_leave_requests',
  UPDATE_MY_LEAVES = 'update_my_leave_request',
  DELETE_ALL_LEAVES = 'delete_all_leave_requests',
  DELETE_MY_LEAVES = 'delete_my_leave_requests',
  PRINT_MY_LEAVES = 'print_my_leave_requests',
  PRINT_ALL_LEAVES = 'print_all_leave_requests',

  PRINT_ALL_PAY_SLIPS = 'print_all_pay_slips',
  PRINT_MY_PAY_SLIPS = 'print_my_pay_slips',

  MANAGE_EMPLOYEES = 'manage_employees',

  MANAGE_DEPARTMENTS = 'manage_departments',

  MANAGE_JOBS = 'manage_jobs',

  MANAGE_PAYSLIP_BONUSES = 'manage_pay_slip_bonus',

  MANAGE_DOCUMENT_TYPES = 'manage_document_types',

  MANAGE_SKILLS = 'manage_skills',

  MANAGE_ORGANIZATION = 'manage_organization',

  MANAGE_LEAVE_REASONS = 'manage_leave_reasons',
  MANAGE_COUNTRIES = 'manage_countries',}