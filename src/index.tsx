import React from 'react'
import styles from './styles.module.css'
import icon from './asset/icon.module.png'

class Tag extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.addNewTag = this.addNewTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
  }

  ENTER_KEY: number = 13

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
        this.state.tags.filter(
          (t: string) => t.toLowerCase() === newTag.toLowerCase()
        ).length > 0
      ) {
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
              this.setState({ tag: e.target.value })
            }}
          />
        </div>
      </div>
    )
  }
}

export default Tag
