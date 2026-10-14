/** Existing published form locales only; adding another locale requires reviewed copy. */
const messages = {
  en: {
    heading: 'Schedule Your Free Consultation', eyebrow: 'Get started',
    intro: 'Tell our client advocates how we can help. Submission is disabled until a production form backend is selected.',
    contactHeading: 'Contact AIA', name: 'Parent or guardian name', email: 'Email', phone: 'Phone',
    service: 'Service of interest', options: ['ABA Therapy', 'Autism Evaluation', 'Learner Social Club', 'Other'],
    message: 'How can we help?', submit: 'Submit',
    disabled: 'Online submission is not yet connected. Please call',
    map: 'Map showing Arizona Institute for Autism in Scottsdale',
    tile: 'OpenStreetMap tile showing area around Arizona Institute for Autism in Scottsdale, AZ',
    zoomIn: 'Zoom in', zoomOut: 'Zoom out', marker: 'Arizona Institute for Autism'
  },
  es: {
    heading: 'Programe su consulta gratuita', eyebrow: 'Comience aquí',
    intro: 'Cuéntenos cómo pueden ayudarle nuestros defensores de clientes. El envío está deshabilitado hasta que se seleccione un sistema para recibir los formularios.',
    contactHeading: 'Contactar a AIA', name: 'Nombre del padre, la madre o el tutor', email: 'Correo electrónico', phone: 'Teléfono',
    service: 'Servicio de interés', options: ['Terapia ABA', 'Evaluación de autismo', 'Learner Social Club', 'Otro'],
    message: '¿Cómo podemos ayudarle?', submit: 'Enviar',
    disabled: 'El envío en línea aún no está habilitado. Llame al',
    map: 'Mapa de la ubicación de Arizona Institute for Autism en Scottsdale',
    tile: 'Mapa de OpenStreetMap de los alrededores de Arizona Institute for Autism en Scottsdale, Arizona',
    zoomIn: 'Acercar', zoomOut: 'Alejar', marker: 'Arizona Institute for Autism'
  }
};

export function formMessages(locale: string) {
  if (locale !== 'en' && locale !== 'es') throw new Error(`No reviewed form copy for locale: ${locale}`);
  return messages[locale];
}
