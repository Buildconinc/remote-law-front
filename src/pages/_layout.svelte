<script>
    import { afterUpdate } from 'svelte';
    import { isActive, url, context } from '@sveltech/routify';

    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';

    afterUpdate(() => {
        window.scrollTo(0, 0);
    });

</script>


<Header />
<slot />
<Footer />