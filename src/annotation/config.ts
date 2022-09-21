let _config: any = {}
export const AnnotationConfigSingleton = {
  initialize: (config) => {
    console.log('config done', config)
    _config = config
  },

  get mode() {
    return _config.mode
  },

  get diffId() {
    return _config.diffId
  }
}
