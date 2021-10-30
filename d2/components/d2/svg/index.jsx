import makeClassnames from 'classnames'
import { defineComponent, unref, computed } from 'vue'
import { useConfig } from 'd2/components/d2/config/use.js'
import { makeName, makeClassName } from 'd2/utils/component.js'
import { warn } from 'd2/utils/error.js'
import { componentName as configComponentName } from 'd2/components/d2/config/index.jsx'

const name = 'svg'

const componentName = makeName(name)
const classname = makeClassName(name)

export default defineComponent({
  name: componentName,
  props: {
    symbolId: { type: String, default: '' },
    dir: { type: String, default: '' },
    name: { type: String, default: '' }
  },
  setup (props) {
    const { svgSymbolId, svgDir } = useConfig()

    const symbolId = computed(() => props.symbolId || svgSymbolId)

    if (!unref(symbolId)) {
      warn(componentName, `symbolId cannot be empty, please pass the 'symbolId' prop for ${componentName} component. or wrap with ${configComponentName} component on the outer layer, and pass the 'svgSymbolId' prop for ${configComponentName} component`)
    }

    const dir = computed(() => props.dir || svgDir)

    const href = computed(() => {
      let _href = '#' + unref(symbolId)
        .replace(/\[dir\]/g, unref(dir))
        .replace(/\[name\]/g, props.name)
      if (!unref(dir)) {
        _href = _href.replace('--', '-')
      }
      return _href
    })

    const classnames = computed(() => makeClassnames(classname, {}))

    return {
      classnames,
      href
    }
  },
  render () {
    const {
      classnames,
      href
    } = this
    return (
      <svg class={ classnames } aria-hidden="true">
        <use xlink:href={ href }/>
      </svg>
    )
  }
})