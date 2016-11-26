<template>
  <div id="form-setup" class="col-md-12">
    <h4>If you already have a form</h4>
    <h4>Point your form at our servers!</h4>
    <p>Set the action attribute on a form like such:</p>
    <p>
      <code>
        &lt;form accept-charset="UTF-8" action="https://functionalform.com/f/991a39ebd75e" method="POST"&gt;
      </code>
    </p>

    <p>After this change, your form’s data will be sent to FunctionalForm when submitted.</p>

    <hr />
    <h4>If you don't have a form yet</h4>
    <p>You can copy and paste this:</p>

    <code>
      &lt;form accept-charset="UTF-8" action="https://functionalform.com/f/991a39ebd75e" method="POST"&gt;

    </code>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },

  computed: {
    form() {
      return this.$store.getters.activeForm;
    }
  }
}
</script>

<style>
</style>
