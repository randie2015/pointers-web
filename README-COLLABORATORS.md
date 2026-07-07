# Guía para colaboradores · CMS Blog Pointers

Esta guía explica cómo subir artículos al blog de Pointers, el flujo de aprobación editorial y las reglas de formato que debes seguir.

## Acceso al CMS

1. Entra a la web de Pointers y abre el panel de administración en `/admin/login`.
2. Inicia sesión con las credenciales que te haya entregado el equipo.
3. Ve a **Dashboard → Blog → Nuevo artículo**.

## Cómo subir un artículo

### 1. Completa los campos obligatorios

| Campo | Obligatorio | Notas |
|-------|-------------|-------|
| **Título** | Sí | Claro, específico y orientado al valor para el lector. |
| **Slug** | Sí | Se autogenera desde el título. No lo cambies salvo que sea necesario. |
| **Categoría** | Sí | Debe ser una de las 4 categorías oficiales (ver abajo). |
| **Contenido** | Sí | Redacta el artículo completo en el editor. |
| Extracto | No | Recomendado para tarjetas y listados. |
| Imagen de portada | No | Recomendada. Se optimiza automáticamente antes de subirse. |
| SEO description | No | Si lo dejas vacío, el sistema lo genera desde el contenido. |

### 2. Selecciona la categoría correcta

Usa **exactamente** una de estas opciones:

- **Estrategia & Branding** — Marca, posicionamiento, identidad, narrativa.
- **Arquitectura & Tech** — Desarrollo web, stack, rendimiento técnico, UX/UI.
- **Reviews & Herramientas** — Análisis de herramientas, plataformas y recursos.
- **Growth & Conversión** — Marketing, funnels, métricas, optimización comercial.

No inventes categorías nuevas ni modifiques el nombre. Esto mantiene coherencia editorial y facilita la navegación del blog.

### 3. Sube la imagen de portada

- Formatos aceptados: JPG, PNG, WebP.
- El sistema **comprime y redimensiona** la imagen (máx. 1200px de ancho) antes de subirla.
- Esto reduce peso en storage y mejora la velocidad del sitio.

### 4. Envía a revisión

Como colaborador, tu botón dirá **"Enviar a revisión"**.

- El artículo se guarda como **borrador** (`status: draft`).
- Queda marcado como **pendiente de revisión** (`reviewed_by: false`).
- **No se publica** en el blog público hasta que un administrador lo apruebe.

## Flujo de aprobación

```text
Colaborador redacta → Envía a revisión → Admin revisa contenido
                                              ↓
                                    ¿Listo para publicar?
                                    /                    \
                                  Sí                      No
                                   ↓                       ↓
                          Admin marca revisado      Admin pide cambios
                          y publica                  (colaborador edita)
                                   ↓
                          Visible en el blog público
```

### Qué puede hacer cada rol

| Acción | Colaborador | Administrador |
|--------|-------------|---------------|
| Crear borradores propios | Sí | Sí |
| Editar borradores propios no revisados | Sí | Sí |
| Editar borradores de otros | No | Sí |
| Marcar `reviewed_by = true` | No | Sí |
| Publicar en el blog público | No | Sí |

## Buenas prácticas editoriales

- Escribe títulos concretos: mejor *"5 señales de que tu web frena conversiones"* que *"Webs y marketing"*.
- Usa párrafos cortos y subtítulos para facilitar la lectura en móvil.
- Revisa ortografía y tono de marca antes de enviar.
- La imagen de portada debe ser horizontal, nítida y sin texto ilegible.
- Si no sabes qué categoría elegir, consulta al admin antes de enviar.

## Preguntas frecuentes

**¿Puedo publicar directamente?**  
No. Solo los administradores pueden marcar un artículo como revisado y publicarlo.

**¿Puedo editar un artículo después de enviarlo?**  
Sí, mientras siga en borrador y no haya sido revisado. Si ya fue revisado, contacta al administrador.

**¿Qué pasa si no pongo SEO description?**  
El sistema genera una automáticamente resumiendo los primeros 160 caracteres del contenido.

**¿Dónde se guardan las imágenes?**  
En el bucket `blog-assets` de Supabase, organizadas por autor.

---

¿Dudas? Contacta al administrador del CMS de Pointers antes de publicar contenido sensible o con datos de clientes.
