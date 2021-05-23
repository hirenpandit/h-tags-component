import React from 'react'
import styles from './styles.module.css'
import icon from './asset/icon.module.png'
// eslint-disable-next-line no-unused-vars
import { TagProperties } from './tag-properties'

class Tag extends React.Component<TagProperties, any> {
  errorRef: any = null
  constructor(props: TagProperties) {
    super(props)
    this.addNewTag = this.addNewTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.errorRef = React.createRef()
  }

  ENTER_KEY: number = 13 // ENTER key

  state = {
    tag: '',
    tags: []
  }

  addNewTag = (e: any) => {
    if (e.which === this.ENTER_KEY) {
      const newTag = e.target.value
      if (!newTag) {
        return
      }
      if (
        !this.props.duplicate &&
        this.state.tags.filter(
          (t: string) => t.toLowerCase() === newTag.toLowerCase()
        ).length > 0
      ) {
        this.errorRef.current.innerHTML = this.props.label + ' already exist'
        return
      }
      this.setState((prevState: any) => ({
        tags: [...prevState.tags, newTag],
        tag: ''
      }))
    }
  }

  removeTag = (tName: any) => {
    this.setState((prevState: any) => ({
      tags: prevState.tags.filter((t: any) => t !== tName)
    }))
  }

  render() {
    return (
      <div>
        <div className={styles.tagContent}>
          {this.state.tags.map((t: any) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <span className={styles.tagItem} key={t}>
                <div className={styles.cancelIcon}>
                  <img src={icon} onClick={() => this.removeTag(t)} />
                </div>
                {t}
              </span>
            )
          })}
        </div>
        <div style={{ gap: '1rem', display: 'flex' }}>
          <span>{this.props.label}</span>
          <input
            type='text'
            onKeyPress={this.addNewTag}
            value={this.state.tag}
            onChange={(e: any) => {
              this.errorRef.current.innerHTML = ''
              this.setState({ tag: e.target.value })
            }}
          />
          <div id='errorMsg' className={styles.errormsg} ref={this.errorRef} />
        </div>
      </div>
    )
  }
}

export default Tag
