function getOffset(el) { 
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
		width: rect.width,
		height: rect.height		
  };
}
export let settings = { backgroundColor : "#e0e0e0" }
export default function skeleton(node, params) {
	const resizeObserver = new ResizeObserver(entries => {
		for (const entry of entries) {
			let box = getOffset(entry.target)
			maska.style.top= box.top + 'px'
			maska.style.left='' +box.left + 'px'
			maska.style.width = (params && params.width) || (box.width  + 'px')
			maska.style.height = (params && params.height) || ( box.height + 'px')				
		}
	});		

	let maska
	let grad
	let removedFromDOM = false		
	resizeObserver.observe(node);		

	function create_mask_and_gradient(box){
		maska = document.createElement("div");
		maska.style.position="absolute"
		maska.style.top= box.top + 'px'
		maska.style.left='' +box.left + 'px'
		maska.style.width = (params && params.width) || (box.width  + 'px')
		maska.style.height = (params && params.height) || ( box.height + 'px')		
		if (params && params.circle) maska.style.borderRadius = '50%'
		maska.style.backgroundColor= settings.backgroundColor
		maska.style.overflow = 'hidden'

		grad = document.createElement("div");
		grad.style.position="absolute"
		grad.style.top="0"
		grad.style.left="0"
		grad.style.width="30px"
		grad.style.bottom="0"
		grad.style.background = 'linear-gradient(to right, transparent 0%, #fff 50%, transparent 100%)';
		grad.style.animation = 'load 1s infinite cubic-bezier(0.4, 0.0, 0.2, 1)'
		//maska.appendChild( document.createTextNode(""));
		maska.appendChild(grad)

		window.document.body.appendChild(maska);
		removedFromDOM = false
	}

	let box = getOffset(node)
	//console.log('init:', box)
	create_mask_and_gradient(box)

	function onImgLoad(event){
		//console.log('Img has been loaded, removing skeleton and event listener');
		node.removeEventListener('load', onImgLoad);
		if (!removedFromDOM) { 
			window.document.body.removeChild(maska)
			removedFromDOM = true
		}
	}
	if (node.nodeName=='IMG') node.addEventListener('load', onImgLoad);

	return {
		update(params){
			if (params.ready){
				if (!removedFromDOM) window.document.body.removeChild(maska)
				removedFromDOM = true
			} else { 
				create_mask_and_gradient(getOffset(node))
			}
		},
		destroy() {
			resizeObserver.unobserve(node);	
			if (!removedFromDOM) window.document.body.removeChild(maska)
		}
	};
}
