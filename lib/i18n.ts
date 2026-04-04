export type Lang = "en" | "es";

export const translations = {
  en: {
    // Nav
    nav_upload: "Upload",
    nav_jobs: "Jobs",
    nav_signout: "Sign out",

    // Home page
    home_badge: "✨ Gender Reveal Voice Generator",
    home_title: "Create Your Baby's Voice",
    home_subtitle: "Upload a video or audio clip, or record directly — we'll transform it into a magical baby voice for your gender reveal moment.",
    home_label_name: "Recording Name",
    home_label_optional: "(optional)",
    home_placeholder_name: "e.g. Baby Shower Recording",
    home_drop_title: "Drop your video or audio here",
    home_drop_formats: "Supports MP4, MOV, MP3, WAV, M4A, AAC, FLAC",
    home_browse: "Browse Files",
    home_uploading: "Uploading…",
    home_record_title: "Record Audio",
    home_record_subtitle: "Capture your voice directly from the browser",
    home_upload_error: "Upload failed",

    // Jobs list
    jobs_title: "Job History",
    jobs_subtitle: "Track all your voice generation jobs",
    jobs_new: "+ New Recording",
    jobs_loading: "Loading…",
    jobs_error: "Failed to load jobs",
    jobs_empty: "No jobs yet.",
    jobs_empty_link: "Upload a file",
    jobs_empty_suffix: "to get started.",
    jobs_col_id: "#",
    jobs_col_name: "NAME",
    jobs_col_file: "SOURCE FILE",
    jobs_col_status: "STATUS",
    jobs_col_created: "CREATED",
    jobs_unnamed: "unnamed",
    jobs_view: "View →",

    // Job detail
    job_loading: "Loading…",
    job_default_title: "Job Detail",
    job_status: "Status",
    job_created: "Created",
    job_pipeline_error: "Pipeline error",
    job_run: "▶ Run Pipeline",
    job_running: "Running pipeline…",
    job_run_error: "Pipeline failed",
    job_outputs: "Output Files",
    job_no_outputs: "No output files yet. Run the pipeline to generate audio.",
    job_col_file: "File",
    job_col_type: "Type",
    job_download: "Download ↓",
    job_load_error: "Failed to load job",

    // Login
    login_loading: "Loading…",
    login_badge: "✨ Gender Reveal Voice Studio",
    login_subtitle: "Sign in to start creating",
    login_redirecting: "Redirecting…",
    login_google: "Continue with Google",
    login_privacy: "Your data is private and only visible to you.",

    // Audio recorder
    rec_start: "Start Recording",
    rec_recording: "Recording…",
    rec_stop: "Stop Recording",
    rec_ready: "Recording ready",
    rec_use: "Use this recording",
    rec_redo: "Re-record",
    rec_mic_error: "Microphone access was denied. Please allow microphone access in your browser settings.",

    // Tutorial
    tutorial_title: "How it works",
    tutorial_step1_title: "Upload or Record",
    tutorial_step1_desc: "Upload a video or audio file from your device, or record directly from your browser microphone.",
    tutorial_step2_title: "Run the Pipeline",
    tutorial_step2_desc: "Open your job and click \"Run Pipeline\". Our engine extracts the audio and applies the baby voice effect.",
    tutorial_step3_title: "Download Your Audio",
    tutorial_step3_desc: "Once processing is complete, download your baby voice audio file ready for your gender reveal moment.",

    // Status badge labels
    status_pending: "pending",
    status_processing: "processing",
    status_completed: "completed",
    status_failed: "failed",
  },
  es: {
    // Nav
    nav_upload: "Subir",
    nav_jobs: "Trabajos",
    nav_signout: "Cerrar sesión",

    // Home page
    home_badge: "✨ Generador de Voz para Revelación de Género",
    home_title: "Crea la Voz de tu Bebé",
    home_subtitle: "Sube un video o audio, o graba directamente — lo transformaremos en una mágica voz de bebé para tu revelación de género.",
    home_label_name: "Nombre de la grabación",
    home_label_optional: "(opcional)",
    home_placeholder_name: "ej. Grabación del Baby Shower",
    home_drop_title: "Arrastra tu video o audio aquí",
    home_drop_formats: "Formatos: MP4, MOV, MP3, WAV, M4A, AAC, FLAC",
    home_browse: "Buscar Archivos",
    home_uploading: "Subiendo…",
    home_record_title: "Grabar Audio",
    home_record_subtitle: "Captura tu voz directamente desde el navegador",
    home_upload_error: "Error al subir",

    // Jobs list
    jobs_title: "Historial de Trabajos",
    jobs_subtitle: "Rastrea todos tus trabajos de generación de voz",
    jobs_new: "+ Nueva Grabación",
    jobs_loading: "Cargando…",
    jobs_error: "Error al cargar los trabajos",
    jobs_empty: "Sin trabajos aún.",
    jobs_empty_link: "Sube un archivo",
    jobs_empty_suffix: "para comenzar.",
    jobs_col_id: "#",
    jobs_col_name: "NOMBRE",
    jobs_col_file: "ARCHIVO FUENTE",
    jobs_col_status: "ESTADO",
    jobs_col_created: "CREADO",
    jobs_unnamed: "sin nombre",
    jobs_view: "Ver →",

    // Job detail
    job_loading: "Cargando…",
    job_default_title: "Detalle del Trabajo",
    job_status: "Estado",
    job_created: "Creado",
    job_pipeline_error: "Error en el proceso",
    job_run: "▶ Ejecutar Proceso",
    job_running: "Ejecutando proceso…",
    job_run_error: "Error en el proceso",
    job_outputs: "Archivos de Salida",
    job_no_outputs: "Sin archivos aún. Ejecuta el proceso para generar audio.",
    job_col_file: "Archivo",
    job_col_type: "Tipo",
    job_download: "Descargar ↓",
    job_load_error: "Error al cargar el trabajo",

    // Login
    login_loading: "Cargando…",
    login_badge: "✨ Estudio de Voz para Revelación de Género",
    login_subtitle: "Inicia sesión para comenzar",
    login_redirecting: "Redirigiendo…",
    login_google: "Continuar con Google",
    login_privacy: "Tus datos son privados y solo visibles para ti.",

    // Audio recorder
    rec_start: "Iniciar Grabación",
    rec_recording: "Grabando…",
    rec_stop: "Detener Grabación",
    rec_ready: "Grabación lista",
    rec_use: "Usar esta grabación",
    rec_redo: "Volver a grabar",
    rec_mic_error: "Se denegó el acceso al micrófono. Por favor, permite el acceso en la configuración de tu navegador.",

    // Tutorial
    tutorial_title: "Cómo funciona",
    tutorial_step1_title: "Sube o Graba",
    tutorial_step1_desc: "Sube un video o audio desde tu dispositivo, o graba directamente desde el micrófono de tu navegador.",
    tutorial_step2_title: "Ejecuta el Proceso",
    tutorial_step2_desc: "Abre tu trabajo y haz clic en \"Ejecutar Proceso\". Nuestro motor extrae el audio y aplica el efecto de voz de bebé.",
    tutorial_step3_title: "Descarga tu Audio",
    tutorial_step3_desc: "Una vez completado el proceso, descarga tu archivo de voz de bebé listo para tu revelación de género.",

    // Status badge labels
    status_pending: "pendiente",
    status_processing: "procesando",
    status_completed: "completado",
    status_failed: "fallido",
  },
} satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof typeof translations.en;
