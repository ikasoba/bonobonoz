(()=>{
  function generateStar(x,y){
      let r = 0
      const star = document.createElement("div")
      star.innerText = "★"
      star.style.color = "yellow"
      star.style.fontSize = "2rem"
      star.style.position = "fixed"
      star.style.top = `${y}px`
      star.style.left = `${x}px`
      star.style.pointerEvents = `none`
      document.body.append(star)
      setTimeout(()=>star.remove(),3000)
      setInterval(()=>(star.style.top = `${y+=1.5}px`,star.style.transform = `rotate(${(r+=1.5) % 360}deg)`),10)
  }
  function generateCombo(x,y,i,m=`${i} combo!`){
      let r = 1
      const star = document.createElement("div")
      star.innerText = m
      star.style.color = "blue"
      star.style.fontSize = "2rem"
      star.style.position = "fixed"
      star.style.top = `${y}px`
      star.style.left = `${x}px`
      star.style.pointerEvents = `none`
      document.body.append(star)
      setTimeout(()=>star.remove(),3000)
      setInterval(()=>(star.style.top = `${y-=1.5}px`,star.style.transform = `rotate(${(r*=1.015) % 360}deg)`),10)
  }
  const a = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","KeyB","KeyA"],
        q = []
  let mx = 0, my=0, lastKeyDowned = 0, combo = 0, flg = 0
  document.body.addEventListener("keydown",(e)=>{
      q.push(e.code)
      combo++;
      lastKeyDowned = Date.now()
      setTimeout(() => Date.now() - lastKeyDowned == 1000 && q.splice(0,q.length),5000)
      if (!q.every((x,i)=>x==a[i]))return q.splice(0,q.length),combo=0;
      if (combo>2)generateCombo(mx,my,combo, combo == a.length ? "complete!" : undefined)
      if (a.every((x,i)=>x==q[i]))(flg^=1),combo=0;
      e.preventDefault()
  })
  document.body.addEventListener("mousemove",((t=0)=>e => {
      mx = e.clientX||0
      my = e.clientY||0
      if (!flg)return;
      if (t++ % 16 != 0)return;
      generateStar(e.clientX||0,e.clientY||0)
  })())
})()