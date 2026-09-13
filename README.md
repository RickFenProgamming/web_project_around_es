# Around The U.S.

## Descripción

Around The U.S. es una aplicación web interactiva para crear y explorar una colección de lugares. La interfaz permite editar la información del perfil, agregar y eliminar tarjetas, marcar lugares con "Me gusta" y abrir sus imágenes en ventanas emergentes.

## Funcionalidades

- Editar el nombre y la descripción del perfil.
- Agregar nuevas tarjetas con título e imagen.
- Dar y quitar "Me gusta" a las tarjetas.
- Eliminar tarjetas.
- Abrir imágenes en tamaño ampliado.
- Validar en tiempo real los formularios de perfil y nuevas tarjetas.
- Mostrar los mensajes de validación predeterminados del navegador.
- Activar los botones de envío únicamente cuando los formularios son válidos.
- Cerrar ventanas emergentes con su botón, la superposición o la tecla Escape.
- Reiniciar la validación visual al volver a abrir un formulario.

## Tecnologías utilizadas

- HTML5
- CSS3
- TypeScript
- Programación orientada a objetos
- Clases, encapsulación, herencia y genéricos
- Módulos ES
- Validación HTML5 mediante `ValidityState`
- Manipulación del DOM y gestión de eventos
- Acoplamiento débil mediante funciones callback
- Metodología BEM
- Git y GitHub

## Arquitectura

El código fuente está organizado en clases independientes. `Card` crea cada tarjeta, `Section` administra su renderizado, `FormValidator` controla la validación, `UserInfo` gestiona el perfil y la familia de clases `Popup` controla las ventanas emergentes.

Los archivos TypeScript se encuentran en `src` y se compilan hacia `public` mediante la configuración de `tsconfig.json`.

## Compilación

```bash
tsc
```

Después de compilar, abre `public/index.html` con un servidor local.

## GitHub Pages

https://rickfenprogamming.github.io/web_project_around_es/
