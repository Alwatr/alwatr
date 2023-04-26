import {sanitizePhoneNumber} from '@alwatr/validator';

let phoneNumber: string | number | null | undefined;
console.log('sanitizedPhoneNumber(%s): %s', (phoneNumber = null), sanitizePhoneNumber(phoneNumber));

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '91 is not a valid phone 55'),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = 1234),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '+ 98 915 11 22 123'),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '98 (915) 11 22 123'),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '0 (915) 11-22-123'),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '91511-22123'),
    sanitizePhoneNumber(phoneNumber),
);

console.log(
    'sanitizedPhoneNumber(%s): %s',
    (phoneNumber = '۹۸ ۹15۱۱-۲۲-۱۲۳'),
    sanitizePhoneNumber(phoneNumber),
);
