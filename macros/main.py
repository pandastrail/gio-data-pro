"""Custom macros for the MkDocs site."""

from datetime import datetime


def define_env(env):
    """Expose helper variables and macros to Markdown and templates."""

    # Expose the build year for use in templates (e.g., footer includes).
    build_year = datetime.now().year
    env.variables["build_year"] = build_year

    @env.macro
    def current_year():
        """Return the current calendar year."""
        return build_year
