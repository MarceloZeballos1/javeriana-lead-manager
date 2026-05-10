# Javeriana Lead & Events Manager

**Despliegue de la aplicación:** https://javeriana-lead-manager-theta.vercel.app/

Aplicación Single Page Application (SPA) desarrollada en React (TypeScript) y Vite para la Dirección de Mercadeo de la Pontificia Universidad Javeriana. Diseñada para la publicación de programas académicos y captura de interesados (leads).

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/MarceloZeballos1/javeriana-lead-manager.git
   ```

2. Ingresar al directorio del proyecto:
   ```bash
   cd javeriana-lead-manager
   ```

3. Instalar las dependencias:
   ```bash
   npm install
   ```

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación se ejecutará de forma predeterminada en `http://localhost:5173`.

## Decisiones Arquitectónicas 

La solución fue estructurada priorizando la mantenibilidad, el tipado estricto y la experiencia de usuario:

1. Uso de Context API: 
   Se implementó `Context API` (`LeadContext`) como solución nativa para el manejo del estado global. Dado que los prospectos (leads) necesitan ser accedidos y modificados desde múltiples componentes (el formulario para agregar y la tabla para listar/eliminar), el uso del Contexto elimina el "prop-drilling", asegurando que el estado y su persistencia (LocalStorage) permanezcan centralizados e independientes de la interfaz de usuario. No se utilizaron librerías externas (como Redux) para evitar sobreingeniería en un estado lineal simple.

2. Clean Code & Modularidad:
   El código está dividido lógicamente en `components`, `context`, `services`, e `interfaces` (types), asegurando el principio de responsabilidad única. Ningún componente excede su carga de abstracción.

3. Seguridad y Validaciones:
   Se implementaron validaciones restrictivas (Expresiones Regulares estandarizadas) para impedir inyecciones (Cross Site Scripting - XSS) en el input de nombre y asegurar el uso exclusivo y estricto del dominio institucional `@javeriana.edu.co`.

4. Persistencia:
   Las sincronizaciones en la base de datos simulada ocurren sincrónicamente en el almacenamiento de sesión local (`localStorage`), blindando el trabajo contra recargas accidentales.

## Prueba de la aplicación

Al entrar al proyecto por primera vez, la tabla de interesados estará vacía. Para probar todas las funcionalidades es necesario crear registros manualmente: haz clic en "Inscribir" en algún programa y llena los datos recordando usar un correo válido de `@javeriana.edu.co`.

Una vez guardados, los registros aparecerán en la tabla inferior, donde podrás probar el filtro por categoría, la paginación y la alerta de seguridad para eliminar datos.

## Autor
Marcelo Santiago Zeballos Murillo
