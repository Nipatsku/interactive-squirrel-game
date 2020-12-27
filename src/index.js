import "./style.css"


const container = document.getElementsByClassName('container')[0]
const start = document.getElementsByClassName('click-to-start')[0]
const scoreLabel = document.getElementsByClassName('score')[0]
const music = document.getElementById('music')
const boop = document.getElementById('boop')


let score = 0
const Squirrel = (opts) => {
    opts = Object.assign({}, {
        x: 0.5,
        y: 0.5,
        size: 100
    }, opts)

    const obj = document.createElement('img')
    obj.className = 'squirrel'
    obj.src = 'squirrel.png'
    obj.style.width = '0px'
    obj.style.left = `${Math.round( opts.x * window.innerWidth )}px`
    obj.style.top = `${Math.round( opts.y * window.innerHeight )}px`
    requestAnimationFrame(() => {
        obj.style.width = `${opts.size}px`
        obj.style.transform = `rotateZ(360deg)`
    })
    container.appendChild(obj)

    let removed = false
    const remove = () => {
        obj.style.pointerEvents = 'none'
        obj.style.width = '0px'
        obj.style.transform = `rotateZ(720deg)`

        setTimeout(() => {
            if (removed) return
            removed = true
            container.removeChild(obj)
        }, 2000)
    }
    const onclick = () => {
        obj.onclick = () => undefined
        scoreLabel.innerHTML = `Score: ${ ++score }`
        boop.play()
        remove()
    }
    obj.onclick = onclick
    setTimeout(remove, 5000)

}

const rand = ( min, max ) => min + Math.random() * (max - min)


start.onclick = () => {
    start.onclick = () => undefined
    start.style.backgroundColor = 'rgba(255,0,0,0)'
    start.style.pointerEvents = 'none'

    music.loop = true
    music.play()

    const addSquirrel = () => {
        Squirrel({
            x: rand(0.1, 0.9),
            y: rand(0.1, 0.9),
            size: rand(50, 150)
        })

        const t = window.performance.now()
        const min = 5000 - Math.min( 4000, 4000 * t / ( 3 * 60 * 1000 ) )
        const max = min * 1.5
        setTimeout(addSquirrel, rand( min, max ))
    }
    setTimeout(addSquirrel, 3000)

}
