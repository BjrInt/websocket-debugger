import { writable } from 'svelte/store'

export const wsURL = writable('')

export const isSocketOpen = writable(false)

export const socketOpenedAt = writable(null)

export const msgFeed = writable([])

export const awaitQueue = writable([])

export const messagesTo = writable([])

export const socket = writable(null)

export const isSocketPaused = writable(false)

export const toggleMessageVisibility = i => {
    msgFeed.update(msgs => {
        const msgsCopy = [...msgs]
        msgsCopy[i]._showMsg = !msgsCopy[i]._showMsg

        return msgsCopy
    })
}

export const openWebSocket = () => {
    let ws
    wsURL.subscribe(url => {
        ws = new WebSocket(url)

        ws.addEventListener('open', () => {
            isSocketOpen.set(true)
            socketOpenedAt.set(Date.now())
            document.title = '🟢 ' + new URL(url).host
        })

        ws.addEventListener('close', () => {
            isSocketOpen.set(false)
            document.title = 'Websocket UI'
        })

        ws.addEventListener('error', console.log)

        ws.addEventListener('message', ({data, timeStamp}) => {
            let message
            try {
                message = JSON.parse(data)
            } catch (error) {
                message = data
            }

            let isPaused
            isSocketPaused.update(x => isPaused = x)

            const toPush = {
                message, timeStamp, _showMsg: false
            }

            if(isPaused){
                awaitQueue.update(list => { list.unshift(toPush); return list })
            }
            else {
                msgFeed.update(list => { list.unshift(toPush); return list })
            }
        })
    })
    socket.set(ws)
}

export const mergeQueues = () => {
    let queueToPush
    awaitQueue.subscribe(x => queueToPush = x)
    msgFeed.update(list => (
        [
            ...queueToPush,
            ...list
        ]
    ))
    awaitQueue.set([])
}

export const closeWebSocket = () => {
    let ws 
    socket.subscribe(x => { 
        ws = x
        ws.close()
    })
}